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
  SIGN_MODAL_TOGGLE,
} from "./types";

export type AuthState = {
  data: User | null;
  isFetching: boolean;
  error: ErrorHttpAction | false;
  showModal: boolean;
};

const initialState: AuthState = {
  data: null,
  isFetching: false,
  error: false,
  showModal: false,
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
    case SIGN_MODAL_TOGGLE:
      return {
        ...state,
        showModal: action.payload,
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
    default:
      // eslint-disable-next-line no-case-declarations
      const x: never = action;
      return state;
  }
};
