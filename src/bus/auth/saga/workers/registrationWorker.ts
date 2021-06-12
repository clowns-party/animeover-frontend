import { SagaIterator } from "redux-saga";
import { put, call } from "redux-saga/effects";

import {
  startFetching,
  stopFetching,
  setFetchingError,
  signModalToggle,
  signInAsync,
} from "../../actions";
import { signUpAsyncType } from "../../types";
import { service } from "../../../../Services";

export function* signUpWorker(action: signUpAsyncType): SagaIterator {
  const { payload } = action;
  try {
    yield put(startFetching());
    const result = yield call(service.authService.signUp, payload);
    if (result?.data) {
      yield put(signModalToggle(false));
      yield put(signInAsync(action.payload));
    } else {
      yield put(
        setFetchingError({
          message: "unresolved",
          code: "500",
        })
      );
    }
  } catch (error) {
    yield put(setFetchingError(error?.response?.data ?? "Some error"));
  } finally {
    yield put(stopFetching());
  }
}
