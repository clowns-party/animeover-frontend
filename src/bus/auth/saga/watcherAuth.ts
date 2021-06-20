// Core
import { SagaIterator } from "redux-saga";
import { all, call, takeEvery } from "redux-saga/effects";

import {
  SIGN_IN_ASYNC,
  LOGOUT,
  ME,
  SIGN_UP_ASYNC,
  CALL_AUTH_ERROR_HANDLER,
} from "../types";
import { authErrorWorker } from "./workers/authErrorWorker";
import { authWorker } from "./workers/authWorker";
import { logoutWorker } from "./workers/logoutWorker";
import { meWorker } from "./workers/meWorker";
import { signUpWorker } from "./workers/registrationWorker";

function* watchFetchAuth(): SagaIterator {
  yield takeEvery(SIGN_IN_ASYNC, authWorker);
}

function* watchLogout(): SagaIterator {
  yield takeEvery(LOGOUT, logoutWorker);
}

function* watchFetchRegistration(): SagaIterator {
  yield takeEvery(SIGN_UP_ASYNC, signUpWorker);
}

function* watchFetchMe(): SagaIterator {
  yield takeEvery(ME, meWorker);
}

function* watchFetchError(): SagaIterator {
  yield takeEvery(CALL_AUTH_ERROR_HANDLER, authErrorWorker);
}

export function* watchAuth(): SagaIterator {
  yield all([
    call(watchFetchAuth),
    call(watchLogout),
    call(watchFetchRegistration),
    call(watchFetchMe),
    call(watchFetchError),
  ]);
}
