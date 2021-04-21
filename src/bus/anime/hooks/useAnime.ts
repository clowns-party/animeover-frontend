import { useSelector } from "react-redux";
import { AnimeState } from "../reducer";
import { AppState } from "../../../../redux/rootReducer";

export const useAnime = (): AnimeState => {
  const { animeList, anime, ongoing, isFetching, error } = useSelector<
    AppState,
    AnimeState
  >((state) => state.anime);

  return {
    animeList,
    anime: !isFetching && anime,
    ongoing,
    isFetching: Boolean(isFetching || !anime),
    error,
  };
};
