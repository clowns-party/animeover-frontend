import Cookies from "js-cookie";
import { signInAsyncType } from "../../types";

export function* logoutWorker(action: signInAsyncType) {
  yield Cookies.remove("token");
  yield Cookies.remove("refreshtoken");
}
