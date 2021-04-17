import Cookies from "js-cookie";
import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import {
  set,
  setFetchingError,
  startFetching,
  stopFetching,
} from "../../actions";
import { meAction, User } from "../../types";
import { service } from "../../../../Services";

export function* meWorker(action: meAction): SagaIterator {
  try {
    yield put(startFetching());
    const { data }: { data: User["user"] } = yield call(service.me);
    if (data) {
      yield put(set({ user: data, token: Cookies.get("token") }));
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
