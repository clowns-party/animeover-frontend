import { SagaIterator } from "redux-saga";
import { takeEvery, call, all } from "redux-saga/effects";
import { GET_ONGOING_LIST } from "../../types";
import { ongoingWorker } from "./ongoingWorker";

function* watchFetchOngoing(): SagaIterator {
  yield takeEvery(GET_ONGOING_LIST, ongoingWorker);
}

export function* watchOngoing(): SagaIterator {
  yield all([call(watchFetchOngoing)]);
}
