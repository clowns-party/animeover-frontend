// Core
import { watchChangePage } from "bus/anime/saga/changePage/changePageWatch";
import { all } from "redux-saga/effects";
import { animeWath } from "../src/bus/anime/saga/anime/animeWatch";
import { watchAnimeList } from "../src/bus/anime/saga/animeList/animeListWatch";
import { watchOngoing } from "../src/bus/anime/saga/ongoing/OngoingWatch";
import { watchAuth } from "../src/bus/auth/saga/watcherAuth";
import { watchRegistration } from "../src/bus/auth/saga/watcherRegistration";
import { watchMe } from "../src/bus/auth/saga/watchMe";

export function* rootSaga(): Generator {
  yield all([
    watchAuth(),
    watchRegistration(),
    watchOngoing(),
    watchAnimeList(),
    watchChangePage(),
    animeWath(),
    watchMe(),
  ]);
}
