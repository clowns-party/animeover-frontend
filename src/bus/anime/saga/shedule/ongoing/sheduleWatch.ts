import { all, call, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { GET_SHEDULE } from "bus/anime/types";
import { sheduleWorker } from "./sheduleWorker";

function* sheduleAnimeFetch(): SagaIterator {
  yield takeEvery(GET_SHEDULE, sheduleWorker);
}

export function* watchShedule(): SagaIterator {
  yield all([call(sheduleAnimeFetch)]);
}
