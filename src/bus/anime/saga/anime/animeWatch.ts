import { takeEvery, all, call } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { GET_ANIME } from "../../types";
import { animeWorker } from "./animeWorker";

function* animeFetchWath(): SagaIterator {
  yield takeEvery(GET_ANIME, animeWorker);
}

export function* animeWath(): SagaIterator {
  yield all([call(animeFetchWath)]);
}
