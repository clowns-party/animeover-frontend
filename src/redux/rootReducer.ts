// Core
import { combineReducers } from "redux";

// Reducers
import { AuthReducer as auth } from "bus/auth/reducer";
import { animeReducer as anime } from "bus/anime/reducer";
import { UserAnimeList as userAnimeList } from "bus/UserAnimeList/reducer";

const reducers = () =>
  combineReducers({
    auth,
    anime,
    userAnimeList,
  });

export const rootReducer = reducers();

export type AppState = ReturnType<typeof rootReducer>;
