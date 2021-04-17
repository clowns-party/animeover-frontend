import Cookies from "js-cookie";
import { AnyAction, Dispatch } from "redux";
import { authInterceptor } from "./axios.interceptor";

export const axiosMiddleware = (store: any) => (
  next: Dispatch<AnyAction>
) => async (action: AnyAction) => {
  // LOGIN || INIT || LOGOUT
  if (action.type === "ME" || action.type === "LOGOUT") {
    authInterceptor(Cookies.get("token"));
  }
  next(action);
};
