import { setFetchingError } from "bus/auth/actions";
import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";

import { callAuthErrorHandler } from "../../types";

export function* authErrorWorker(action: callAuthErrorHandler): SagaIterator {
  yield put(setFetchingError(action.payload));
  yield call(clearToast);
  yield put(setFetchingError(false));
}
let clearTm: NodeJS.Timeout;
const clearToast = async () => {
  return new Promise((resolve) => {
    if (clearTm) {
      clearTimeout(clearTm);
    }
    clearTm = setTimeout(() => {
      resolve(true);
    }, 3000);
  });
};
