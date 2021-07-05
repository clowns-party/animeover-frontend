import {
  getAnimeListType,
  GET_ANIME_LIST,
  setAnimeListType,
  SET_ANIME_LIST,
  AnimeList,
  START_ANIME_LIST,
  startAnimeListType,
  STOP_ANIME_LIST,
  stopAnimeListType,
  SET_ERROR_ANIME_LIST,
  setErrorAnimeListType,
  AnimeError,
  SET_ONGOING_LIST,
  setOngoingListType,
  getOngoingListType,
  GET_ONGOING_LIST,
  GET_ANIME,
  getAnimeType,
  Anime,
  setAnimeType,
  SET_ANIME,
  IdType,
  setAnimeListCountType,
  SET_ANIME_LIST_COUNT,
  changePageType,
  CHANGE_PAGE,
  AnimeListPageParams,
  SET_CURRENT_PAGE,
  setCurrentPageType,
  setFilteredType,
  SET_FILTERED,
  FiltersPayload,
  FETCH_WITH_FILTERS,
  SetFilteredPayload,
  SET_FILTERS,
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

export function setAnime(payload: Anime): setAnimeType {
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
