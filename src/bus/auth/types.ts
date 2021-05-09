export interface UserSchema {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: null | string;
  isAnonymous: boolean;
  tenantId: null | string;
}

export type User = {
  token: string;
  user: UserSchema;
};

export type UserResponse = { data: User };

export const GET_USER_ANIME_LIST = "GET_USER_ANIME_LIST";
export type getUserAnimeListType = {
  type: typeof GET_USER_ANIME_LIST;
};

export const USER_ANIME_LIST_START = "USER_ANIME_LIST_START";
export type userAnimeListStartType = {
  type: typeof USER_ANIME_LIST_START;
};

export const USER_ANIME_LIST_STOP = "USER_ANIME_LIST_STOP";
export type userAnimeListStopType = {
  type: typeof USER_ANIME_LIST_STOP;
};

export const USER_ANIME_LIST_ERROR = "USER_ANIME_LIST_ERROR";
export type userAnimeListErrorType = {
  type: typeof USER_ANIME_LIST_ERROR;
  payload: any
};

export const SET_USER_ANIME_LIST = "SET_USER_ANIME_LIST";
export type setUserAnimeList = {
  type: typeof SET_USER_ANIME_LIST;
  payload: any;
};

export const ME = "ME";
export type meAction = {
  type: typeof ME;
  token?: string;
};
export const AUTH_SET = "AUTH_SET";
export type setType = {
  type: typeof AUTH_SET;
  payload: User;
};

export type AuthFormData = {
  email: string;
  password: string;
  repassword: string;
};

export type ErrorHttpAction = {
  message: string;
  code: string | number;
};

// Sync
export const AUTH_START_FETCHING = "AUTH_START_FETCHING";
export type AuthStartFechingAction = {
  type: typeof AUTH_START_FETCHING;
};

export const AUTH_STOP_FETCHING = "AUTH_STOP_FETCHING";
type AuthStopFechingAction = {
  type: typeof AUTH_STOP_FETCHING;
};

export const AUTH_SET_FETCHING_ERROR = "AUTH_SET_FETCHING_ERROR";
export type AuthSetError = {
  type: typeof AUTH_SET_FETCHING_ERROR;
  payload: ErrorHttpAction;
};

// Async

export const SIGN_IN_ASYNC = "SIGN_IN_ASYNC";
export type signInAsyncType = {
  type: typeof SIGN_IN_ASYNC;
  payload: AuthFormData;
};

export const SIGN_UP_ASYNC = "SIGN_UP_ASYNC";
export type signUpAsyncType = {
  type: typeof SIGN_UP_ASYNC;
  payload: AuthFormData;
};

// сделать при перезугрке страницы подтягивание данных
export const INIT_AUTH_ASYNC = "INIT_AUTH_ASYNC";
export type initAuthAsync = {
  type: typeof INIT_AUTH_ASYNC;
};

export const LOGOUT = "LOGOUT";
export type logoutType = {
  type: typeof LOGOUT;
};

export type AuthActionTypes =
  | signUpAsyncType
  | signInAsyncType
  | setType
  | AuthStartFechingAction
  | AuthStopFechingAction
  | logoutType
  | AuthSetError
  | userAnimeListStartType
  | userAnimeListStopType
  | userAnimeListErrorType
  | getUserAnimeListType
  | setUserAnimeList
  | meAction;
