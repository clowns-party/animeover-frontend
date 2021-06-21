import cookie from "cookie";
import Cookies from "js-cookie";
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
    access: cookies[AUTH_TOKEN] || Cookies.get(AUTH_TOKEN),
    refresh: cookies[REFRESH_TOKEN] || Cookies.get(REFRESH_TOKEN),
  };
};
