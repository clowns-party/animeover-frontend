import { useSelector } from "react-redux";
import { AnimeState } from "../reducer";
import { AppState } from "../../../../redux/rootReducer";

export const useAnimelist = (): AnimeState => {
  const { anime, ongoing, isFetching, error } = useSelector<
    AppState,
    AnimeState
  >((state) => state.anime);

  return { anime, ongoing, isFetching, error };
};
