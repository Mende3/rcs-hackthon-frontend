import axios from 'axios';

const API_URL = 'https://rcs-hackthon-django.onrender.com'; // URL base correta

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  telefone: string;
}

export interface AuthResponse {
  refresh: string;
  access: string;
  user: User;
}

export interface LoginData {
  username: string;
  password: string;
}

class AuthService {
  async login(loginData: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/app_user_controller/token/`, // URL completa correta
        loginData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (response.data.access) {
        this.setTokens(response.data.access, response.data.refresh);
        this.setUser(response.data.user);
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Erro no login:', error);
      
      if (error.response?.status === 401) {
        throw new Error('Credenciais inválidas. Verifique seu usuário e senha.');
      } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
        throw new Error('Não foi possível conectar ao servidor.');
      } else if (error.response?.status === 404) {
        throw new Error('url não encontrado.');
      } else {
        throw new Error('Erro no servidor. Tente novamente mais tarde.');
      }
    }
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }

  private setTokens(access: string, refresh: string): void {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  private setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export const authService = new AuthService();