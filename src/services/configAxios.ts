import axios from "axios";
import { authService } from "./authService";

const api = axios.create({
  baseURL: "https://rcs-hackthon-django.onrender.com",
});

// Intercepta requisições → adiciona token
api.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepta respostas → se token expirou, tenta refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // se deu 401 e ainda não tentou refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      authService.getRefreshToken()
    ) {
      originalRequest._retry = true;
      try {
        const refresh = authService.getRefreshToken();
        const res = await axios.post(`${api.defaults.baseURL}/app_user_controller/token/refresh/`, {
          refresh,
        });

        const newAccess = res.data.access;
        localStorage.setItem("access_token", newAccess);

        // Atualiza o header e repete a request original
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (err) {
        authService.logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
