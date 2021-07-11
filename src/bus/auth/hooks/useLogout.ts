import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AUTH_TOKEN, REFRESH_TOKEN } from "utils/axios/axios.auth";
import { set } from "../actions";

export const useLogout = () => {
  const dispatch = useDispatch();
  const history = useRouter();
  const logout = () => {
    localStorage.clear();
    Cookies.remove(AUTH_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
    dispatch(set(null));
    history.push("/");
  };
  return logout;
};
