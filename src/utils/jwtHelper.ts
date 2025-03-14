import { jwtDecode } from 'jwt-decode';

// Define a interface para o payload do JWT
interface JwtPayload {
  [key: string]: any; // O JWT pode conter várias claims
}

// Função para obter uma claim específica de um token JWT
export const getClaimFromToken = (claim: string): string | null => {
  const token = localStorage.getItem('accessToken'); // Substitua por onde o token está armazenado (localStorage, cookie, etc.)

  if (!token) {
    console.error('Token não encontrado');
    return null;
  }

  try {
    const decodedToken = jwtDecode<JwtPayload>(token); // Decodifica o token JWT
    return decodedToken[claim] || null; // Retorna a claim específica, ou null se não existir
  } catch (error) {
    console.error('Erro ao decodificar o token', error);
    return null;
  }
};
