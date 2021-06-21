import { AxiosInstance, AxiosResponse } from "axios";
import { Anime, AnimeList, IdType, AnimeData } from "bus/anime/types";
import autoBind from "auto-bind";
import { Api } from "./Api";

export class Service extends Api {
  public instance: AxiosInstance;
  constructor() {
    super();
    autoBind(this);
  }
  animeList(limit: number, page: number): Promise<AxiosResponse<AnimeData>> {
    return this.getInstance().get<AnimeData>(
      `/animedb?limit=${limit}&page=${page}`
    );
  }

  ongoingList(): Promise<AxiosResponse<AnimeList>> {
    return this.getInstance().get<AnimeList>("/ongoing");
  }

  anime(id: IdType): Promise<AxiosResponse<Anime>> {
    return this.getInstance().get<Anime>(`/animedb/anime/${id}`);
  }
}
