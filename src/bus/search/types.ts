import { AnimeList } from "bus/anime/types";

export const GET_SEARCH_ANIME_LIST = "GET_SEARCH_ANIME_LIST";
export type searchAnimeActionType = {
  type: typeof GET_SEARCH_ANIME_LIST;
  payload: string;
};

export const SET_SEARCH_ANIME = "SET_SEARCH_ANIME";
export type setSearchAnimeType = {
  type: typeof SET_SEARCH_ANIME;
  payload: AnimeList;
};

export type searchActionsTypes = searchAnimeActionType | setSearchAnimeType;
