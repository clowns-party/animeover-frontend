import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import Cookies from "js-cookie";
import Router from "next/router";
import {
  set,
  setFetchingError,
  startFetching,
  stopFetching,
} from "../../actions";
import { signInAsyncType, UserResponse } from "../../types";
import { service } from "../../../../Services";

export function* authWorker(action: signInAsyncType): SagaIterator {
  try {
    yield put(startFetching());
    const result: UserResponse = yield call(service.auth, action.payload);
    if (result?.data) {
      yield put(set(result.data));
      // Пересмотри этот сеттер куки, будто иногда не отрабатывает
      Cookies.set("token", result.data.token, { expires: 7 });
      Router.push("/");
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
