// Core
import { all } from "redux-saga/effects";
import { watchAnime } from "../src/bus/anime/saga/watchAnime";
import { watchAuth } from "../src/bus/auth/saga/watcherAuth";
import { watchRegistration } from "../src/bus/auth/saga/watcherRegistration";

export function* rootSaga(): Generator {
  yield all([watchAuth(), watchRegistration(), watchAnime()]);
}
