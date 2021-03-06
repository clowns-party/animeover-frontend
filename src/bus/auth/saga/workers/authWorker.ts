import Cookies from "js-cookie";
import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import service from "Services";
import { AUTH_TOKEN, REFRESH_TOKEN } from "utils/axios/axios.auth";
import {
  callAuthError,
  set,
  signModalToggle,
  startFetching,
  stopFetching,
} from "../../actions";
import { signInAsyncType, UserResponse } from "../../types";

export function* authWorker(action: signInAsyncType): SagaIterator {
  try {
    yield put(startFetching());
    const result: UserResponse = yield call(
      service.authService.auth,
      action.payload
    );
    if (result?.data) {
      yield put(set({ user: result.data }));
      // Пересмотри этот сеттер куки, будто иногда не отрабатывает
      Cookies.set(AUTH_TOKEN, result.data.accessToken, { expires: 7 });
      Cookies.set(REFRESH_TOKEN, result.data?.refreshToken, {
        expires: 7,
      });
      yield put(signModalToggle(false));
    } else {
      yield put(
        callAuthError({
          error: {
            message: "unresolved",
            code: "500",
          },
          for: "login",
        })
      );
    }
  } catch (error) {
    yield put(
      callAuthError({
        error: error?.response?.data ?? "Some error",
        for: "login",
      })
    );
  } finally {
    yield put(stopFetching());
  }
}
