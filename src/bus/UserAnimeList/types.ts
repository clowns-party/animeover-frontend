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

import { Anime } from "bus/anime/types";
import { ErrorHttpAction } from "bus/auth/types";

export type RawAnimeListType = {
  [id: string]: {
    status: string;
    review: string;
    star: number;
  };
};

export type ResponseUserAnimeListType = {
  data: RawAnimeListType;
};

export type UserAnimeListType = Anime[];

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

export type UserAnimeListActionTypes =
  | getUserAnimeListType
  | toggleLoadingUserAnimeListType
  | setUserAnimeList
  | setErrorAnimeListType;
