// Core
import { AxiosInstance } from "axios";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
// Utils
import { axiosInstace } from "utils/axios/axios.instance";

export interface ApiService {
  getInstance?: () => AxiosInstance;
  instance: AxiosInstance;
}
export class Api implements ApiService {
  public instance: AxiosInstance;

  // Context only if you like use ssr
  public getInstance(
    context?: GetServerSidePropsContext<ParsedUrlQuery>
  ): AxiosInstance {
    const currentInstance = axiosInstace(context);
    this.instance = currentInstance;
    return currentInstance;
  }
}
