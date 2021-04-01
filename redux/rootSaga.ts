// Core
import { all } from "redux-saga/effects";
import { watchAnime } from "../src/bus/anime/saga/anime/watchAnime";
import { watchOngoing } from "../src/bus/anime/saga/ongoing/watchOngoing";
import { watchAuth } from "../src/bus/auth/saga/watcherAuth";
import { watchRegistration } from "../src/bus/auth/saga/watcherRegistration";

export function* rootSaga(): Generator {
  yield all([watchAuth(), watchRegistration(), watchOngoing(), watchAnime()]);
}
