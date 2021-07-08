import { AnimeTagsType, SeasonsType } from "bus/filters/types";

export type AnimeList = Array<Anime>;

export type Anime = {
  _id: string;
  sources: Array<string>;
  title: string;
  type: string;
  episodes: number;
  status: string;
  animeSeason: {
    season: SeasonsType | string;
    year: number;
  };
  picture: string;
  thumbnail: string;
  synonyms: Array<string>;
  relations: Array<string>;
  tags: Array<string>;
};

export type AnimeListPageParams = {
  limit: number;
  page: number;
};

export type AnimeData = {
  animeList: AnimeList;
  count: number;
};
export type AnimeListReponse = { data: AnimeData };
export type OngoingListRespose = { data: AnimeData["animeList"] };
export type AnimeResponse = { data: Anime };
export type IdType = string | string[];

export type AnimeError = {
  message: string;
  code: number | string;
};

export const GET_ANIME_LIST = "GET_ANIME_LIST";
export type getAnimeListType = {
  type: typeof GET_ANIME_LIST;
  payload: AnimeListPageParams;
};

export const STOP_ANIME_LIST = "STOP_ANIME_LIST";
export type stopAnimeListType = {
  type: typeof STOP_ANIME_LIST;
};

export const SET_ERROR_ANIME_LIST = "SET_ERROR_ANIME_LIST";
export type setErrorAnimeListType = {
  type: typeof SET_ERROR_ANIME_LIST;
  payload: AnimeError;
};

export const START_ANIME_LIST = "START_ANIME_LIST";
export type startAnimeListType = {
  type: typeof START_ANIME_LIST;
};

export const SET_ANIME_LIST = "SET_ANIME_LIST";
export type setAnimeListType = {
  type: typeof SET_ANIME_LIST;
  payload: AnimeList;
};

export const GET_ONGOING_LIST = "GET_ONGOING_LIST";
export type getOngoingListType = {
  type: typeof GET_ONGOING_LIST;
};

export const SET_ONGOING_LIST = "SET_ONGOING_LIST";
export type setOngoingListType = {
  type: typeof SET_ONGOING_LIST;
  payload: AnimeList;
};

export const GET_ANIME = "GET_ANIME";
export type getAnimeType = {
  type: typeof GET_ANIME;
  payload: IdType;
};

export const SET_ANIME = "SET_ANIME";
export type setAnimeType = {
  type: typeof SET_ANIME;
  payload: Anime;
};

export const SET_ANIME_LIST_COUNT = "SET_ANIME_LIST_COUNT";
export type setAnimeListCountType = {
  type: typeof SET_ANIME_LIST_COUNT;
  payload: number;
};

export const CHANGE_PAGE = "CHANGE_PAGE";
export type changePageType = {
  type: typeof CHANGE_PAGE;
  payload: AnimeListPageParams;
};

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export type setCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  payload: number;
};

export type FiltersPayload = {
  season?: SeasonsType;
  tag?: AnimeTagsType;
  page?: number;
};
export const FETCH_WITH_FILTERS = "FETCH_WITH_FILTERS";
export type fetchWithFiltersType = {
  type: typeof FETCH_WITH_FILTERS;
  payload: FiltersPayload;
};

export type SetFilteredPayload = {
  animeList: AnimeList;
  filters: FiltersPayload;
};
export const SET_FILTERED = "SET_FILTERED";
export type setFilteredType = {
  type: typeof SET_FILTERED;
  payload: SetFilteredPayload;
};

export const SET_FILTERS = "SET_FILTERS";
export type setFiltersType = {
  type: typeof SET_FILTERS;
  payload: FiltersPayload;
};

export type animeActionsTypes =
  | getAnimeListType
  | setOngoingListType
  | setAnimeListType
  | startAnimeListType
  | stopAnimeListType
  | setErrorAnimeListType
  | getAnimeType
  | setAnimeType
  | setAnimeListCountType
  | getOngoingListType
  | setCurrentPageType
  | setFilteredType
  | fetchWithFiltersType
  | setFiltersType;
