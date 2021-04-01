// Core
import { combineReducers } from "redux";

// Reducers
import { AuthReducer as auth } from "../src/bus/auth/reducer";
import { animeReducer as anime } from "../src/bus/anime/reducer";

const reducers = () =>
  combineReducers({
    auth,
    anime,
  });

export const rootReducer = reducers();

export type AppState = ReturnType<typeof rootReducer>;
