import { AxiosInstance, AxiosResponse } from "axios";
import { Anime, IdType } from "bus/anime/types";
import autoBind from "auto-bind";
import { Api } from "./Api";

export class Service implements Api {
  public instance: AxiosInstance;
  constructor(instance: AxiosInstance) {
    this.instance = instance;
    autoBind(this);
  }
  animeList(limit: number, page: number): Promise<AxiosResponse<Anime>> {
    return this.instance.get<Anime>(`/animedb?limit=${limit}&page=${page}`);
  }

  ongoingList(): Promise<AxiosResponse<Anime>> {
    return this.instance.get<Anime>("/ongoing");
  }

  anime(id: IdType): Promise<AxiosResponse<Anime>> {
    return this.instance.get<Anime>(`/animedb/anime/${id}`);
  }
}
