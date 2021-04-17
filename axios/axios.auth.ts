import cookie from "cookie";
import { AxiosRequestConfig } from "axios";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

export const AUTH_TOKEN = "token";
const isSSR = typeof window === "undefined";

export const getToken = (
  context?: GetServerSidePropsContext<ParsedUrlQuery>
): string => {
  const headerCookie = context?.req?.headers?.cookie;
  const cookies = cookie.parse(
    headerCookie && isSSR ? headerCookie || "" : !isSSR ? document?.cookie : ""
  );
  return cookies[AUTH_TOKEN] || "";
};

export const createSetAuthInterceptor = (token: string) => (
  config: AxiosRequestConfig
) => {
  if (token) {
    config.headers.Authorization = token;
  } else {
    delete config.headers.Authorization;
  }
  return config;
};
