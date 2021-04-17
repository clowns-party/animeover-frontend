import Cookies from "js-cookie";
import { AnyAction, Dispatch } from "redux";
import { axiosInstace } from "./axios.instance";

export const axiosMiddleware = (store: any) => (
  next: Dispatch<AnyAction>
) => async (action: AnyAction) => {
  // LOGIN || INIT || LOGOUT
  if (action.type === "ME" || action.type === "LOGOUT") {
    axiosInstace.interceptors.request.use((config) => {
      const token = Cookies.get("token");
      config.headers.Authorization = token;
      return config;
    });
  }

  next(action);
};
