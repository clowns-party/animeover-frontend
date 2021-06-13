import Cookies from "js-cookie";
import { AUTH_TOKEN, REFRESH_TOKEN } from "utils/axios/axios.auth";
import { signInAsyncType } from "../../types";

export function* logoutWorker(action: signInAsyncType) {
  yield Cookies.remove(AUTH_TOKEN);
  yield Cookies.remove(REFRESH_TOKEN);
}
