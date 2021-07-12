import { useSelector } from "react-redux";
import { AppState } from "redux/rootReducer";
import { calculateRating } from "../../../utils/anime/calculateRating";
import { AnimeState } from "../reducer";

export const useAnime = () => {
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
    anime: !isFetching && anime?.info,
    details: anime?.detail,
    rating: calculateRating(anime?.detail),
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
