import { SET_ERROR_ANIME_LIST } from "bus/anime/types";
import { ErrorHttpAction } from "bus/auth/types";
import {
  RawAnimeListType,
  UserAnimeListType,
  UserAnimeListActionTypes,
  GET_USER_ANIME_LIST,
  TOGGLE_LOADING_USER_ANIME_LIST,
  SET_USER_ANIME_LIST,
} from "./types";

type UserAnimeListState = {
  data: UserAnimeListType;
  isFetching: boolean;
  error: ErrorHttpAction | false;
  _original: RawAnimeListType;
};

const initialState: UserAnimeListState = {
  data: null,
  isFetching: false,
  error: false,
  _original: null,
};

export const UserAnimeList = (
  state = initialState,
  action: UserAnimeListActionTypes
): UserAnimeListState => {
  switch (action.type) {
    case GET_USER_ANIME_LIST:
      return {
        ...state,
      };
    case TOGGLE_LOADING_USER_ANIME_LIST:
      return {
        ...state,
        isFetching: action.payload,
      };
    case SET_USER_ANIME_LIST:
      return {
        ...state,
        _original: action?.payload?._original || state._original,
        data: action.payload.data,
      };
    case SET_ERROR_ANIME_LIST:
      return {
        ...state,
        error: action.payload,
      };
    default:
      // eslint-disable-next-line no-case-declarations
      const x: never = action;
      return state;
  }
};