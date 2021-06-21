import { AxiosResponse } from "axios";
import { ResponseUserAnimeListType } from "bus/UserAnimeList/types";
import autoBind from "auto-bind";
import { Api } from "./Api";

export class Service extends Api {
  constructor() {
    super();
    autoBind(this);
  }
  animeList(): Promise<AxiosResponse<ResponseUserAnimeListType>> {
    return this.getInstance().get<ResponseUserAnimeListType>(`/user/animelist`);
  }
}
