import autoBind from "auto-bind";
import { AxiosInstance, AxiosResponse } from "axios";
import {
  Anime,
  AnimeData,
  AnimeList,
  FiltersPayload,
  IdType,
} from "bus/anime/types";
import { RawAnimeListType } from "bus/UserAnimeList/types";
import { Api } from "./Api";

export class Service extends Api {
  public instance: AxiosInstance;
  constructor() {
    super();
    autoBind(this);
  }
  animeList(
    limit: number,
    page: number,
    filters: FiltersPayload = {}
  ): Promise<AxiosResponse<AnimeData>> {
    let request = {
      params: {},
    };
    if (filters) {
      request = {
        params: {
          ...filters,
        },
      };
    }
    return this.getInstance().get<AnimeData>(
      `/animedb?limit=${limit}&page=${page}`,
      request
    );
  }

  ongoingList(): Promise<AxiosResponse<AnimeList>> {
    return this.getInstance().get<AnimeList>("/ongoing");
  }

  sheduleAnime(): Promise<AxiosResponse<AnimeList>> {
    return this.getInstance().get<AnimeList>("/animedb/schedule");
  }

  anime(id: IdType): Promise<AxiosResponse<Anime>> {
    return this.getInstance().get<Anime>(`/animedb/anime/${id}`);
  }
  animeDetailByID(id: IdType): Promise<AxiosResponse<RawAnimeListType[]>> {
    return this.getInstance().get<RawAnimeListType[]>(`/animedetail/${id}`);
  }
  searchAnime(text: string): Promise<AxiosResponse<Anime>> {
    return this.getInstance().get<Anime>(`/search?queryText=${text}`);
  }
}
