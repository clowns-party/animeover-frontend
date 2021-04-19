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
  REMOVE_ANIME_STATE,
  removeAnimeStateType,
  SET_ANIME,
  IdType,
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

export function getAnimeList(): getAnimeListType {
  return {
    type: GET_ANIME_LIST,
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

export function removeAnimeState(): removeAnimeStateType {
  return {
    type: REMOVE_ANIME_STATE,
  };
}
