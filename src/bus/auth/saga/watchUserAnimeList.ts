import { all, call, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { GET_USER_ANIME_LIST } from "../types";
import { userAnimeListWorker } from "./workers/userAnimeListWorker";

function* FetchUserAnimeList(): SagaIterator {
  yield takeEvery(GET_USER_ANIME_LIST, userAnimeListWorker);
}

export function* wathUserAnimeList(): SagaIterator {
  yield all([call(FetchUserAnimeList)]);
}
