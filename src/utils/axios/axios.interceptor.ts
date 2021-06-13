import { axiosInstace } from "./axios.instance";

export const authInterceptor = (token: string, refreshtoken: string) => {
  axiosInstace.interceptors.request.use((config) => {
    config.headers.Authorization = token;
    config.headers.Refreshtoken = refreshtoken;
    return config;
  });
};
