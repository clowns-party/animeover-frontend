import { axiosInstace } from "./axios.instance";

export const authInterceptor = (token: string) => {
  axiosInstace.interceptors.request.use((config) => {
    config.headers.Authorization = token;
    return config;
  });
};
