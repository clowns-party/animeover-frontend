import { AnimeList } from "bus/anime/types";
import {
  searchAnimeActionType,
  GET_SEARCH_ANIME_LIST,
  SET_SEARCH_ANIME,
  setSearchAnimeType,
} from "./types";

export function searchAnimeAction(payload: string): searchAnimeActionType {
  return {
    type: GET_SEARCH_ANIME_LIST,
    payload,
  };
}

export function setSearchAnime(payload: AnimeList): setSearchAnimeType {
  return {
    type: SET_SEARCH_ANIME,
    payload,
  };
}
