import { SagaIterator } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { patchImgShiki } from "utils/common/patchImgShiki";
import service from "Services";
import {
  setOngoingList,
  startAnime,
  stopAnime,
  setErrorAnime,
} from "../../actions";
// types
import { OngoingListRespose } from "../../types";

export function* ongoingWorker(): SagaIterator {
  yield put(startAnime());
  try {
    const result: OngoingListRespose = yield call(
      service.animeService.ongoingList
    );
    yield put(setOngoingList(patchImgShiki(result.data)));
  } catch (err) {
    yield put(setErrorAnime(err));
  } finally {
    yield put(stopAnime());
  }
}
