import { useSelector } from "react-redux";
import { AppState } from "redux/rootReducer";
import { AnimeState } from "../reducer";

export const useAnime = (): AnimeState => {
  const {
    animeList,
    anime,
    ongoing,
    isFetching,
    error,
    currentPage,
    count,
    filtered,
    pageLimit,
    filters,
  } = useSelector<AppState, AnimeState>((state) => state.anime);

  return {
    animeList,
    anime: !isFetching && anime,
    currentPage,
    count,
    ongoing,
    pageLimit,
    isFetching,
    error,
    filtered,
    filters,
  };
};
