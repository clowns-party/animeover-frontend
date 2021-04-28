import { all, call, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { CHANGE_PAGE } from "../../types";
import { changePageWorker } from "./changePageWorker";

export function* watchFetchChangePage(): SagaIterator {
  yield takeEvery(CHANGE_PAGE, changePageWorker);
}

export function* watchChangePage(): SagaIterator {
  yield all([call(watchFetchChangePage)]);
}
