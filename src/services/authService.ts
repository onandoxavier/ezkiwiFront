import api from './api';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export async function login(email: string, password: string) {
  const response = await api.post<LoginResponse>('/api/auth/login', {
    email,
    password,
  });  

  var result = response.data;

  localStorage.setItem('accessToken', result.accessToken);
  localStorage.setItem('refreshToken', result.refreshToken);
  
  return response.data;
}

export async function refresh() {

  const refreshToken = localStorage.getItem('refreshToken');
  const response = await api.post<LoginResponse>('/api/auth/refresh', {
    refreshToken,
  });

  var result = response.data;
  
  localStorage.setItem('accessToken', result.accessToken);
  localStorage.setItem('refreshToken', result.refreshToken);
  
  return response.data;
}

export async function logout() {  
  try {
    await api.post('/api/auth/logout');
  } catch (error) {
    console.error('Erro ao fazer logout', error);
  }
  
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
