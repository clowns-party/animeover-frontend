import { useSelector } from "react-redux";
import { AppState } from '../../../redux/rootReducer';
import { AuthState } from "../reducer";

export const useAuth = (): AuthState => {
  const { data, isFetching, error } = useSelector<AppState, AuthState>((state) => state.auth);

  return { data, isFetching, error };
};
