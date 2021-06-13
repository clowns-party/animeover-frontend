import Cookies from "js-cookie";
import { AnyAction, Dispatch } from "redux";
import { AUTH_TOKEN, REFRESH_TOKEN } from "./axios.auth";
import { authInterceptor } from "./axios.interceptor";

export const axiosMiddleware = (store: any) => (
  next: Dispatch<AnyAction>
) => async (action: AnyAction) => {
  // LOGIN || INIT || LOGOUT
  if (action.type === "ME" || action.type === "LOGOUT") {
    authInterceptor(Cookies.get(AUTH_TOKEN), Cookies.get(REFRESH_TOKEN));
  }
  next(action);
};
