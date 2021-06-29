import { SET_ERROR_ANIME_LIST } from "bus/anime/types";
import { ErrorHttpAction } from "bus/auth/types";
import {
  getUserAnimeListType,
  GET_USER_ANIME_LIST,
  setUserAnimeListPayload,
  SET_USER_ANIME_LIST,
  TOGGLE_LOADING_USER_ANIME_LIST,
  UserAnimeListActionTypes,
  CHANGE_ANIME_USER_LIST,
  changeAnimeUserListType,
  UserAnimeListFormData,
  RawAnimeListType,
} from "./types";

export function getUserAnimeList(): getUserAnimeListType {
  return {
    type: GET_USER_ANIME_LIST,
  };
}

export function toggleLoadingUserAnimeList(
  isFetching: boolean
): UserAnimeListActionTypes {
  return {
    type: TOGGLE_LOADING_USER_ANIME_LIST,
    payload: isFetching,
  };
}

export function setUserAnimeList(
  payload: setUserAnimeListPayload
): UserAnimeListActionTypes {
  return {
    type: SET_USER_ANIME_LIST,
    payload,
  };
}

export function setErrorAnimeList(
  payload: ErrorHttpAction
): UserAnimeListActionTypes {
  return {
    type: SET_ERROR_ANIME_LIST,
    payload,
  };
}

export function changeAnimeUserList(payload: {
  response: RawAnimeListType;
  changed: UserAnimeListFormData;
}): changeAnimeUserListType {
  return {
    type: CHANGE_ANIME_USER_LIST,
    payload,
  };
}
