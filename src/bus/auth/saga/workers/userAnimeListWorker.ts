import {
  setUserAnimeList,
  userAnimeListErrors,
  userAnimeListStart,
  userAnimeListStop,
} from "bus/auth/actions";
import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { service } from "Services";

export function* userAnimeListWorker(): SagaIterator {
  try {
    yield put(userAnimeListStart());
    const result = yield call(service.authService.userAnimeList);
    const array = Object.entries(result?.data);
    const newArr = array?.reduce((acc, el) => {
      const [uuid, item] = el;
      item["id"] = uuid;
      acc.push(el[1]);
      return acc;
    }, []);
    yield put(setUserAnimeList(newArr));
  } catch (err) {
    yield put(userAnimeListErrors(err));
  } finally {
    yield put(userAnimeListStop());
  }
}
