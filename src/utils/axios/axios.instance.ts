import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { getToken } from "./axios.auth";

export const BASE_API_URL = "https://animeover-api.herokuapp.com";
export const axiosInstace = (
  context?: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  const cookies = getToken(context);
  return cookies?.access && cookies?.refresh
    ? axios.create({
        baseURL: BASE_API_URL,
        headers: {
          Authorization: cookies.access,
          Refreshtoken: cookies.refresh,
        },
      })
    : axios.create({
        baseURL: BASE_API_URL,
      });
};
