import { SagaIterator } from "@redux-saga/types";
import { all, call, takeLatest } from "redux-saga/effects";
import { GET_USER_ANIME_LIST } from "../types";
import { userAnimeListWorker } from "./workers/userAnimeList.worker";

export function* useAnimeListFetchWorker(): SagaIterator {
  yield takeLatest(GET_USER_ANIME_LIST, userAnimeListWorker);
}

export function* userAnimeListWatcher(): SagaIterator {
  yield all([call(useAnimeListFetchWorker)]);
}
