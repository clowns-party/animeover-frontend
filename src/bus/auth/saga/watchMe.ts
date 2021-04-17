// core
import { SagaIterator } from "redux-saga";
import { all, call, takeEvery } from "redux-saga/effects";
// types
import { ME } from "../types";
// worker
import { meWorker } from "./workers/meWorker";

function* watchFetchMe(): SagaIterator {
  yield takeEvery(ME, meWorker);
}

export function* watchMe(): SagaIterator {
  yield all([call(watchFetchMe)]);
}
