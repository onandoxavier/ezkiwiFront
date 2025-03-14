import axios, { AxiosError, AxiosResponse } from 'axios';
import { refresh } from './authService';

export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  errors?: string[];
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API URL
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const AccessToken = localStorage.getItem('accessToken'); // Adjust if you store the token elsewhere
    if (AccessToken && config.headers) {
      config.headers.Authorization = `Bearer ${AccessToken}`;
    }

    // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // if (timezone)
    //   config.headers['X-Timezone'] = timezone 
    return config;
  },
  (error) => { Promise.reject(error) }
);

// Flag para evitar loop infinito de refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

// Função auxiliar para processar fila de requisições que falharam durante o refresh
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  
  (response: AxiosResponse) => { return response; }, // Permite continuar normalmente para respostas 2xx
  
  async (error: AxiosError<ProblemDetails>) => {
    const originalRequest = error.config!;

    if (error.response && error.response.status === 404) {
        return Promise.resolve({ status: 404, data: [] }); // Trata como sucesso
    }

    // Se não for 401, rejeita
    if (error.response?.status !== 401) {
      const problem = error.response?.data;
      return Promise.reject(problem);
    }

    // Se cair aqui, provavelmente o accessToken expirou.
    // Pega o refreshToken
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {      
      // Se não há refresh token, desloga ou trata de outro modo    
      const problem = error.response?.data;
      return Promise.reject(problem);
    }

    // Evita que várias requisições 401 disparem múltiplos refresh
    if (isRefreshing) {
      
      // Se já está atualizando token, empilha a requisição para tentar novamente
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return axios(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    isRefreshing = true;

    // Tenta refresh
    try {
      await refresh();
      const accessToken = localStorage.getItem('accessToken');

      processQueue(null, accessToken);

      // Refaz a requisição original com o novo token
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }
      
      return axios(originalRequest);

    } catch (err) {
      // Se deu erro no refresh, processa a fila informando erro
      processQueue(err as any, null);

      // Também pode deslogar o usuário aqui
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;