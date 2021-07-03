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
  REMOVE_ANIME_LIST_BY_ID,
  removeAnimeByIdType,
  toggleUserAnimeListModalType,
  TOGGLE_USER_ANIME_LIST_MODAL,
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

export function changeAnimeUserList(
  payload: UserAnimeListFormData
): changeAnimeUserListType {
  return {
    type: CHANGE_ANIME_USER_LIST,
    payload,
  };
}

export function removeAnimeUserListById(payload: string): removeAnimeByIdType {
  return {
    type: REMOVE_ANIME_LIST_BY_ID,
    payload,
  };
}

export function toggleUserAnimeListModal(
  payload: boolean
): toggleUserAnimeListModalType {
  return {
    type: TOGGLE_USER_ANIME_LIST_MODAL,
    payload,
  };
}
