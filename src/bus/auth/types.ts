export interface UserSchema {
  displayName: string;
  photoURL: string;
  email: string;
  emailVerified: boolean;
  accessToken: string;
  refreshToken: string;
}

export type User = {
  user: UserSchema;
};

export type UserResponse = { data: UserSchema };

export const ME = "ME";
export type meAction = {
  type: typeof ME;
  tokens?: {
    access: string;
    refresh: string;
  };
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
export type ERROR_TYPES_AUTH = "me" | "login" | "register";

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
export type AuthErrorPayload =
  | {
      error: ErrorHttpAction;
      for: ERROR_TYPES_AUTH;
    }
  | false;
export type AuthSetError = {
  type: typeof AUTH_SET_FETCHING_ERROR;
  payload: AuthErrorPayload;
};
// saga
export const CALL_AUTH_ERROR_HANDLER = "CALL_AUTH_ERROR_HANDLER";
export type callAuthErrorHandler = {
  type: typeof CALL_AUTH_ERROR_HANDLER;
  payload: AuthErrorPayload;
};

// Async

export const SIGN_IN_ASYNC = "SIGN_IN_ASYNC";
export type signInAsyncType = {
  type: typeof SIGN_IN_ASYNC;
  payload: AuthFormData;
};

export const SIGN_MODAL_TOGGLE = "SIGN_MODAL_TOGGLE";
export type signModalToggleType = {
  type: typeof SIGN_MODAL_TOGGLE;
  payload: boolean;
};

export const SIGN_UP_ASYNC = "SIGN_UP_ASYNC";
export type signUpAsyncType = {
  type: typeof SIGN_UP_ASYNC;
  payload: AuthFormData;
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
  | meAction
  | signModalToggleType
  | callAuthErrorHandler;
