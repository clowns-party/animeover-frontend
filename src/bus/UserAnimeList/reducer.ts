import { SET_ERROR_ANIME_LIST } from "bus/anime/types";
import { ErrorHttpAction } from "bus/auth/types";
import { AppState } from "../../redux/rootReducer";
import {
  RawAnimeListType,
  UserAnimeListType,
  UserAnimeListActionTypes,
  GET_USER_ANIME_LIST,
  TOGGLE_LOADING_USER_ANIME_LIST,
  SET_USER_ANIME_LIST,
  CHANGE_ANIME_USER_LIST,
  REMOVE_ANIME_LIST_BY_ID,
  TOGGLE_USER_ANIME_LIST_MODAL,
} from "./types";

type UserAnimeListState = {
  data: UserAnimeListType;
  isFetching: boolean;
  error: ErrorHttpAction | false;
  _original: RawAnimeListType;
  show: boolean;
};

const initialState: UserAnimeListState = {
  data: null,
  isFetching: false,
  error: false,
  _original: null,
  show: false,
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
    case REMOVE_ANIME_LIST_BY_ID:
      return { ...state };
    case CHANGE_ANIME_USER_LIST: {
      return {
        ...state,
      };
    }
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
    case TOGGLE_USER_ANIME_LIST_MODAL:
      return {
        ...state,
        show: action.payload,
      };
    default:
      // eslint-disable-next-line no-case-declarations
      const x: never = action;
      return state;
  }
};

// Selectors
export const userAnimeList = (state: AppState) =>
  (state.userAnimeList.data?.length && state.userAnimeList.data) || null;

export const userAnimeListState = (state: AppState) => state.userAnimeList;

export const animeInUserList = (state: AppState, animeId: string) => {
  const selectedList = state.userAnimeList._original;
  return selectedList && selectedList[animeId];
};
