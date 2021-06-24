import Cookies from "js-cookie";
import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { REFRESH_TOKEN } from "utils/axios/axios.auth";
import { set, callAuthError, startFetching, stopFetching } from "../../actions";
import { meAction, User } from "../../types";
import { service } from "../../../../Services";

export function* meWorker(action: meAction): SagaIterator {
  try {
    yield put(startFetching());
    const { data }: { data: User["user"] } = yield call(
      service.authService.me,
      // action?.tokens?.access,
      // action?.tokens?.refresh
    );
    if (data) {
      Cookies.set(REFRESH_TOKEN, data?.refreshToken, {
        expires: 7,
      });
      yield put(set({ user: data }));
    } else {
      yield put(
        callAuthError({
          error: {
            message: "unresolved",
            code: "500",
          },
          for: "me",
        })
      );
    }
  } catch (error) {
    yield put(
      callAuthError({
        error: error?.response?.data ?? "Some error",
        for: "me",
      })
    );
  } finally {
    yield put(stopFetching());
  }
}
