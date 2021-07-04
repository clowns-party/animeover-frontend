import { SagaIterator } from "redux-saga";
import { takeEvery, all, call } from "redux-saga/effects";
import { animeListWorker } from "./animeListWorker";
import { FETCH_WITH_FILTERS, GET_ANIME_LIST } from "../../types";
import { animeListFiltersWorker } from "./animeListFiltersWorker";

function* watchFetchAnimeList(): SagaIterator {
  yield takeEvery(GET_ANIME_LIST, animeListWorker);
  yield takeEvery(FETCH_WITH_FILTERS, animeListFiltersWorker);
}

export function* watchAnimeList(): SagaIterator {
  yield all([call(watchFetchAnimeList)]);
}
