import { AxiosInstance, AxiosResponse } from "axios";
import { Anime, AnimeList, IdType } from "bus/anime/types";
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

  ongoingList(): Promise<AxiosResponse<AnimeList>> {
    return this.instance.get<AnimeList>("/ongoing");
  }

  anime(id: IdType): Promise<AxiosResponse<Anime>> {
    return this.instance.get<Anime>(`/animedb/anime/${id}`);
  }
}
