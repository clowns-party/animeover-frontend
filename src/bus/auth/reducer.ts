import {
  AuthActionTypes,
  User,
  AUTH_SET,
  SIGN_IN_ASYNC,
  SIGN_UP_ASYNC,
  AUTH_START_FETCHING,
  AUTH_STOP_FETCHING,
  AUTH_SET_FETCHING_ERROR,
  ErrorHttpAction,
  LOGOUT,
  ME,
  GET_USER_ANIME_LIST,
  USER_ANIME_LIST_START,
  USER_ANIME_LIST_STOP,
  USER_ANIME_LIST_ERROR,
  SET_USER_ANIME_LIST,
} from "./types";

export type AuthState = {
  data: User | null;
  isFetching: boolean;
  userAnimeIsFething: boolean;
  userAnimeList: any;
  UserAnimeError: ErrorHttpAction | false;
  error: ErrorHttpAction | false;
};

const initialState: AuthState = {
  data: null,
  isFetching: false,
  userAnimeIsFething: false,
  userAnimeList: null,
  UserAnimeError: false,
  error: false,
};

export const AuthReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case AUTH_SET:
      return {
        ...state,
        data: action.payload,
      };
    case SIGN_IN_ASYNC:
      return {
        ...state,
      };
    case AUTH_START_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case AUTH_STOP_FETCHING:
      return {
        ...state,
        isFetching: false,
      };
    case AUTH_SET_FETCHING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SIGN_UP_ASYNC:
      return {
        ...state,
      };
    case LOGOUT:
      return {
        ...state,
        data: null,
      };
    case ME: {
      return { ...state };
    }
    case GET_USER_ANIME_LIST: {
      return { ...state };
    }
    case USER_ANIME_LIST_START: {
      return {
        ...state,
        userAnimeIsFething: true,
      };
    }
    case USER_ANIME_LIST_STOP: {
      return {
        ...state,
        userAnimeIsFething: false,
      };
    }
    case USER_ANIME_LIST_ERROR: {
      return {
        ...state,
        UserAnimeError: action.payload,
      };
    }
    case SET_USER_ANIME_LIST: {
      return {
        ...state,
        userAnimeList: action.payload,
      };
    }
    default:
      // eslint-disable-next-line no-case-declarations
      const x: never = action;
      return state;
  }
};
