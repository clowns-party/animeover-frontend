import cookie from "cookie";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

export const AUTH_TOKEN = "token";
export const REFRESH_TOKEN = "refreshtoken";
const isSSR = typeof window === "undefined";

export const getToken = (
  context?: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  const headerCookie = context?.req?.headers?.cookie;
  const cookies = cookie.parse(
    headerCookie && isSSR ? headerCookie || "" : !isSSR ? document?.cookie : ""
  );

  return {
    access: cookies[AUTH_TOKEN],
    refresh: cookies[REFRESH_TOKEN],
  };
};

// export const createSetAuthInterceptor = (
//   token: string,
//   refreshToken: string
// ) => (config: AxiosRequestConfig) => {
//   if (token && refreshToken) {
//     config.headers.Authorization = token || "";
//     config.headers.Refreshtoken = refreshToken || "";
//   } else {
//     delete config.headers.Authorization;
//     delete config.headers.Refreshtoken;
//   }
//   return config;
// };
