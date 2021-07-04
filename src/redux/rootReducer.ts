// Core
import { combineReducers } from "redux";

// Reducers
import { AuthReducer as auth } from "bus/auth/reducer";
import { animeReducer as anime } from "bus/anime/reducer";
import { UserAnimeList as userAnimeList } from "bus/UserAnimeList/reducer";
import { searchReducer as search } from "bus/search/reducer";

const reducers = () =>
  combineReducers({
    auth,
    anime,
    userAnimeList,
    search,
  });

export const rootReducer = reducers();

export type AppState = ReturnType<typeof rootReducer>;
