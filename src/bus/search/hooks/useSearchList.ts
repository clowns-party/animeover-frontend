import { useSelector } from "react-redux";
import { AppState } from "redux/rootReducer";
import { SearchState } from "../reducer";

export const useSearchList = () => {
  const { searchAnimeList } = useSelector<AppState, SearchState>(
    (state) => state?.search
  );
  return { searchAnimeList };
};
