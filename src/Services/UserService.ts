import { AxiosInstance, AxiosResponse } from "axios";
import { ResponseUserAnimeListType } from "bus/UserAnimeList/types";
import autoBind from "auto-bind";
import { Api } from "./Api";

export class Service implements Api {
  public instance: AxiosInstance;
  constructor(instance: AxiosInstance) {
    this.instance = instance;
    autoBind(this);
  }
  animeList(): Promise<AxiosResponse<ResponseUserAnimeListType>> {
    return this.instance.get<ResponseUserAnimeListType>(`/user/animelist`);
  }
}
