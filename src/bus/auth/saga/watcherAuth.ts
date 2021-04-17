// Core
import { SagaIterator } from "redux-saga";
import { all, call, takeEvery } from "redux-saga/effects";

import { SIGN_IN_ASYNC, LOGOUT } from "../types";
import { authWorker } from "./workers/authWorker";
import { logoutWorker } from "./workers/logoutWorker";

function* watchFetchAuth(): SagaIterator {
  yield takeEvery(SIGN_IN_ASYNC, authWorker);
}

function* watchLogout(): SagaIterator {
  yield takeEvery(LOGOUT, logoutWorker);
}

export function* watchAuth(): SagaIterator {
  yield all([call(watchFetchAuth), call(watchLogout)]);
}
