import { setShedule, startAnime, stopAnime } from "bus/anime/actions";
import { SheduleRespose } from "bus/schedule/types";
import { sheduleListStorage } from "bus/UserAnimeList/storage/sheduleList.storage";
import { SagaIterator } from "redux-saga";
import { put, call } from "redux-saga/effects";
import service from "Services";
import { setErrorAnime } from "../../actions";
// types

export function* sheduleWorker(): SagaIterator {
  const storage = sheduleListStorage();
  const newDate = new Date().toISOString().slice(0, 10);
  const { currentDate, sheduleList } = storage.get();
  yield put(startAnime());
  try {
    // new Date(newDate).toISOString().slice(0, 10) !==
    // new Date(currentDate).toISOString().slice(0, 10)
    if (newDate !== currentDate) {
      const result: SheduleRespose = yield call(
        service.animeService.sheduleAnime
      );
      storage.set(result.data, newDate);
      yield put(setShedule(result.data));
    } else {
      yield put(setShedule(sheduleList));
    }
  } catch (err) {
    yield put(setErrorAnime(err));
  } finally {
    yield put(stopAnime());
  }
}
