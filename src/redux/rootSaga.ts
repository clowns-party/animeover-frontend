// Core
import { watchChangePage } from "bus/anime/saga/changePage/changePageWatch";
import { all } from "redux-saga/effects";
import { animeWath } from "bus/anime/saga/anime/animeWatch";
import { watchAnimeList } from "bus/anime/saga/animeList/animeListWatch";
import { watchOngoing } from "bus/anime/saga/ongoing/OngoingWatch";
import { watchAuth } from "bus/auth/saga/watcherAuth";
import { userAnimeListWatcher } from "bus/UserAnimeList/saga/userAnimeList.watcher";

export function* rootSaga(): Generator {
  yield all([
    watchAuth(),
    watchOngoing(),
    watchAnimeList(),
    watchChangePage(),
    animeWath(),
    userAnimeListWatcher(),
  ]);
}
