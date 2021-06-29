import { SagaIterator } from "@redux-saga/types";
import { all, call, takeLatest } from "redux-saga/effects";
import { CHANGE_ANIME_USER_LIST, GET_USER_ANIME_LIST } from "../types";
import { changeUserAnimeListWorker } from "./workers/changeUserAnimeList.worker";
import { userAnimeListWorker } from "./workers/userAnimeList.worker";

export function* animeListFetchWatcher(): SagaIterator {
  yield takeLatest(GET_USER_ANIME_LIST, userAnimeListWorker);
}

export function* animeListChangeWorker(): SagaIterator {
  yield takeLatest(CHANGE_ANIME_USER_LIST, changeUserAnimeListWorker);
}

export function* userAnimeListWatcher(): SagaIterator {
  yield all([call(animeListFetchWatcher), call(animeListChangeWorker)]);
}
