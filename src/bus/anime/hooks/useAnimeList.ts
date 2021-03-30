import { useSelector } from "react-redux";
import { AppState } from "../../../init/rootReducer";
import { AnimeState } from "../reducer";

export const useAnimelist = (): AnimeState => {
  const { anime, ongoing, isFetching, error } = useSelector<AppState, AnimeState>(
    (state) => state.anime
  );

  return { anime, ongoing, isFetching, error };
};
