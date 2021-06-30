// {
//   "02c1848c-8ec6-4288-8348-9e6bd9f5526d": {
//     "status": "look",
//     "review": "норм, смотреть можно",
//     "star": "9"
//   },
//   "0010beea-25f0-427e-b833-34c38f92d4fe": {
//     "review": "",
//     "status": "viewed",
//     "star": "0"
//   }
// }

import { AxiosResponse } from "axios";
import { Anime } from "bus/anime/types";
import { ErrorHttpAction } from "bus/auth/types";

export type RawAnimeListType = {
  [id: string]: {
    status: UserAnimeListStatuses;
    review: string;
    star: UserAnimeListStars;
  };
};

export type ResponseUserAnimeListType = AxiosResponse<RawAnimeListType>;

export type UserAnimeListType = Anime[];

export type UserAnimeListStatuses =
  | "viewed"
  | "abandoned"
  | "postponed"
  | "planned"
  | "reviewing"
  | "look";
export type UserAnimeListStars =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";

export type UserAnimeListFormData = {
  animeId: string;
  status: UserAnimeListStatuses;
  review?: string;
  star?: UserAnimeListStars;
};

export const GET_USER_ANIME_LIST = "GET_USER_ANIME_LIST";
export type getUserAnimeListType = {
  type: typeof GET_USER_ANIME_LIST;
};

export const TOGGLE_LOADING_USER_ANIME_LIST = "TOGGLE_LOADING_USER_ANIME_LIST";
export type toggleLoadingUserAnimeListType = {
  type: typeof TOGGLE_LOADING_USER_ANIME_LIST;
  payload: boolean;
};

export const SET_USER_ANIME_LIST = "SET_USER_ANIME_LIST";
export type setUserAnimeListPayload = {
  _original?: RawAnimeListType;
  data: UserAnimeListType;
};
export type setUserAnimeList = {
  type: typeof SET_USER_ANIME_LIST;
  payload: setUserAnimeListPayload;
};

export const SET_ERROR_ANIME_LIST = "SET_ERROR_ANIME_LIST";
export type setErrorAnimeListType = {
  type: typeof SET_ERROR_ANIME_LIST;
  payload: ErrorHttpAction;
};

export const CHANGE_ANIME_USER_LIST = "CHANGE_ANIME_USER_LIST";
export type changeAnimeUserListType = {
  type: typeof CHANGE_ANIME_USER_LIST;
  payload: UserAnimeListFormData;
};

export const REMOVE_ANIME_LIST_BY_ID = "REMOVE_ANIME_LIST_BY_ID";
export type removeAnimeByIdType = {
  type: typeof REMOVE_ANIME_LIST_BY_ID;
  payload: string;
};

export type UserAnimeListActionTypes =
  | getUserAnimeListType
  | toggleLoadingUserAnimeListType
  | setUserAnimeList
  | setErrorAnimeListType
  | changeAnimeUserListType
  | removeAnimeByIdType;
