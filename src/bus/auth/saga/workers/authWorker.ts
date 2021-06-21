import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import Cookies from "js-cookie";
import { AUTH_TOKEN, REFRESH_TOKEN } from "utils/axios/axios.auth";
import {
  callAuthError,
  set,
  signModalToggle,
  startFetching,
  stopFetching,
} from "../../actions";
import { signInAsyncType, UserResponse } from "../../types";
import { service } from "../../../../Services";

export function* authWorker(action: signInAsyncType): SagaIterator {
  try {
    yield put(startFetching());
    const result: UserResponse = yield call(
      service.authService.auth,
      action.payload
    );
    if (result?.data) {
      yield put(set(result.data));
      // Пересмотри этот сеттер куки, будто иногда не отрабатывает
      Cookies.set(AUTH_TOKEN, result.data.token, { expires: 7 });
      Cookies.set(
        REFRESH_TOKEN,
        result.data?.user?.stsTokenManager?.refreshToken,
        {
          expires: 7,
        }
      );
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
