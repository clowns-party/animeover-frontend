import {
  setType,
  AuthActionTypes,
  SIGN_IN_ASYNC,
  SIGN_UP_ASYNC,
  User,
  AUTH_SET,
  AUTH_START_FETCHING,
  AUTH_STOP_FETCHING,
  AUTH_SET_FETCHING_ERROR,
  AuthFormData,
  ErrorHttpAction,
  getUserAnimeListType,
  LOGOUT,
  ME,
  GET_USER_ANIME_LIST,
  USER_ANIME_LIST_START,
  USER_ANIME_LIST_STOP,
  USER_ANIME_LIST_ERROR,
  SET_USER_ANIME_LIST,
} from "./types";

// USER ANIME

export function getUserAnimeList(): getUserAnimeListType {
  return {
    type: GET_USER_ANIME_LIST,
  };
}

export function userAnimeListStart(): AuthActionTypes {
  return {
    type: USER_ANIME_LIST_START,
  };
}

export function userAnimeListStop(): AuthActionTypes {
  return {
    type: USER_ANIME_LIST_STOP,
  };
}

export function userAnimeListErrors(payload: any): AuthActionTypes {
  return {
    type: USER_ANIME_LIST_ERROR,
    payload,
  };
}

export function setUserAnimeList(payload: any) {
  return {
    type: SET_USER_ANIME_LIST,
    payload,
  };
}

// SIGN IN ACTIONS
export function signInAsync(payload: AuthFormData): AuthActionTypes {
  return {
    type: SIGN_IN_ASYNC,
    payload,
  };
}

export function set(payload: User): setType {
  return {
    type: AUTH_SET,
    payload,
  };
}

export function startFetching(): AuthActionTypes {
  return {
    type: AUTH_START_FETCHING,
  };
}

export function stopFetching(): AuthActionTypes {
  return {
    type: AUTH_STOP_FETCHING,
  };
}

export function setFetchingError(payload: ErrorHttpAction): AuthActionTypes {
  return {
    type: AUTH_SET_FETCHING_ERROR,
    payload,
  };
}

// SIGN UP ACTIONS
export function signUpAsync(payload: AuthFormData): AuthActionTypes {
  return {
    type: SIGN_UP_ASYNC,
    payload,
  };
}

export function logout(): AuthActionTypes {
  return {
    type: LOGOUT,
  };
}

export const me = (token?: string): AuthActionTypes => ({
  type: ME,
  token,
});
