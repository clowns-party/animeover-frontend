import { all, call, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { searchAnimeWorker } from "./workers/searchAnimeWorker";
import { GET_SEARCH_ANIME_LIST } from "../types";

function* searchAnimeFetch(): SagaIterator {
  yield takeEvery(GET_SEARCH_ANIME_LIST, searchAnimeWorker);
}

export function* searchAnimeWatcher(): SagaIterator {
  yield all([call(searchAnimeFetch)]);
}
