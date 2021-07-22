import { startAnime, stopAnime } from "bus/anime/actions";
import { SheduleRespose } from "bus/schedule/types";
import { SagaIterator } from "redux-saga";
import { put, call } from "redux-saga/effects";
import service from "Services";
import { setErrorAnime, setShedule } from "../../../actions";
// types

export function* sheduleWorker(): SagaIterator {
  yield put(startAnime());
  try {
    const result: SheduleRespose = yield call(
      service.animeService.sheduleAnime
    );
    // patchImgShiki убрать
    yield put(setShedule(result.data));
  } catch (err) {
    yield put(setErrorAnime(err));
  } finally {
    yield put(stopAnime());
  }
}
