import { ScheduleDateItems } from "bus/schedule/types";
import {
  AnimeError,
  AnimeList,
  AnimeListPageParams,
  changePageType,
  CHANGE_PAGE,
  FETCH_WITH_FILTERS,
  FiltersPayload,
  getAnimeListType,
  getAnimeType,
  getOngoingListType,
  getSheduleType,
  GET_ANIME,
  GET_ANIME_LIST,
  GET_ONGOING_LIST,
  GET_SHEDULE,
  IdType,
  setAnimeListCountType,
  setAnimeListType,
  SetAnimePayload,
  setAnimeType,
  setCurrentPageType,
  setErrorAnimeListType,
  SetFilteredPayload,
  setFilteredType,
  setOngoingListType,
  setSheduleType,
  SET_ANIME,
  SET_ANIME_LIST,
  SET_ANIME_LIST_COUNT,
  SET_CURRENT_PAGE,
  SET_ERROR_ANIME_LIST,
  SET_FILTERED,
  SET_FILTERS,
  SET_ONGOING_LIST,
  SET_SHEDULE,
  startAnimeListType,
  START_ANIME_LIST,
  stopAnimeListType,
  STOP_ANIME_LIST,
} from "./types";

export function startAnime(): startAnimeListType {
  return {
    type: START_ANIME_LIST,
  };
}

export function stopAnime(): stopAnimeListType {
  return {
    type: STOP_ANIME_LIST,
  };
}

export function setErrorAnime(payload: AnimeError): setErrorAnimeListType {
  return {
    type: SET_ERROR_ANIME_LIST,
    payload,
  };
}

export function getAnimeList(payload: AnimeListPageParams): getAnimeListType {
  return {
    type: GET_ANIME_LIST,
    payload,
  };
}

export function setAnimeList(payload: AnimeList): setAnimeListType {
  return {
    type: SET_ANIME_LIST,
    payload,
  };
}

export function getOngoingList(): getOngoingListType {
  return {
    type: GET_ONGOING_LIST,
  };
}

export function setOngoingList(payload: AnimeList): setOngoingListType {
  return {
    type: SET_ONGOING_LIST,
    payload,
  };
}

export function getAnime(payload: IdType): getAnimeType {
  return {
    type: GET_ANIME,
    payload,
  };
}

export function setAnime(payload: SetAnimePayload): setAnimeType {
  return {
    type: SET_ANIME,
    payload,
  };
}

export function setAnimeListCount(payload: number): setAnimeListCountType {
  return {
    type: SET_ANIME_LIST_COUNT,
    payload,
  };
}

export function changePage(payload: AnimeListPageParams): changePageType {
  return {
    type: CHANGE_PAGE,
    payload,
  };
}

export function setCurrentPage(payload: number): setCurrentPageType {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
}

export function setFiltered(payload: SetFilteredPayload): setFilteredType {
  return {
    type: SET_FILTERED,
    payload,
  };
}

export function fetchWithFilters(payload: FiltersPayload) {
  return {
    type: FETCH_WITH_FILTERS,
    payload,
  };
}

export function setFilters(payload: FiltersPayload) {
  return {
    type: SET_FILTERS,
    payload,
  };
}

export function getShedule(): getSheduleType {
  return {
    type: GET_SHEDULE,
  };
}

export function setShedule(payload: ScheduleDateItems): setSheduleType {
  return {
    type: SET_SHEDULE,
    payload,
  };
}
