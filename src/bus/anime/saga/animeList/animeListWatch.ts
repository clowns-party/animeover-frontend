import { SagaIterator } from "redux-saga";
import { takeEvery, all, call } from "redux-saga/effects";
import { animeListWorker } from "./animeListWorker";
import { GET_ANIME_LIST } from "../../types";

function* watchFetchAnimeList(): SagaIterator {
  yield takeEvery(GET_ANIME_LIST, animeListWorker);
}

export function* watchAnimeList(): SagaIterator {
  yield all([call(watchFetchAnimeList)]);
}
