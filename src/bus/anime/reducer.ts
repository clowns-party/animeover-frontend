import {
  GET_ANIME_LIST,
  animeActionsTypes,
  SET_ANIME_LIST,
  AnimeList,
  START_ANIME_LIST,
  STOP_ANIME_LIST,
  SET_ERROR_ANIME_LIST,
  AnimeError,
  GET_ONGOING_LIST,
  SET_ONGOING_LIST,
  GET_ANIME,
  SET_ANIME,
  Anime,
} from "./types";

export type AnimeState = {
  anime: Anime | null;
  animeList: AnimeList | null;
  ongoing: AnimeList | null;
  isFetching: boolean;
  error: AnimeError | false;
};

const initialState: AnimeState = {
  anime: null,
  animeList: null,
  ongoing: null,
  isFetching: false,
  error: false,
};

export const animeReducer = (
  state = initialState,
  action: animeActionsTypes
): AnimeState => {
  switch (action.type) {
    case GET_ANIME_LIST:
      return {
        ...state,
      };
    case GET_ONGOING_LIST:
      return {
        ...state,
      };
    case SET_ANIME_LIST:
      return {
        ...state,
        animeList: [...action.payload],
      };
    case SET_ONGOING_LIST:
      return {
        ...state,
        ongoing: [...action.payload],
      };
    case START_ANIME_LIST:
      return {
        ...state,
        isFetching: true,
      };
    case STOP_ANIME_LIST:
      return {
        ...state,
        isFetching: false,
      };
    case SET_ERROR_ANIME_LIST:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ANIME:
      return {
        ...state,
        anime: null,
      };
    case SET_ANIME:
      return {
        ...state,
        anime: { ...action.payload },
      };
    default:
      // eslint-disable-next-line no-case-declarations
      const x: never = action;
      return state;
  }
};
