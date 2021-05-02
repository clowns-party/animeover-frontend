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
    totalPages,
    pageLimit,
  } = useSelector<AppState, AnimeState>((state) => state.anime);

  return {
    animeList,
    anime: !isFetching && anime,
    currentPage,
    totalPages,
    ongoing,
    pageLimit,
    isFetching: Boolean(isFetching || !anime),
    error,
  };
};
