import { useSelector } from "react-redux";
import { AppState } from "redux/rootReducer";
import { AuthState } from "../reducer";
import { ERROR_TYPES_AUTH } from "../types";

export const useAuth = (type?: ERROR_TYPES_AUTH): AuthState => {
  const { data, isFetching, error, showModal } = useSelector<
    AppState,
    AuthState
  >((state) => state.auth);

  const err = type
    ? error && type && error.for === type
      ? error
      : false
    : error;

  return { data, isFetching, error: err, showModal };
};
