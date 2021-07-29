import { DetailsAnimeList, RawAnimeListType } from "bus/UserAnimeList/types";
import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import service from "Services";
import { sheduleListStorage } from "bus/UserAnimeList/storage/sheduleList.storage";
import { setAnime, setErrorAnime, startAnime, stopAnime } from "../../actions";
import { AnimeResponse, getAnimeType } from "../../types";
import { formatAnimeDetail } from "../../../../utils/anime/formatAnimeDetail";

export function* animeWorker(action: getAnimeType): SagaIterator {
  yield put(startAnime());
  const storage = sheduleListStorage();
  const { sheduleList } = storage.get();
  const { selectedDay } = yield select((state) => state.anime);
  const anime = sheduleList[selectedDay]?.find(
    (el) => el._id === action?.payload
  );
  if (!!anime && Object.keys(anime).length !== 0) {
    try {
      yield put(setAnime({ anime, detail: [] }));
    } catch (error) {
      yield put(setErrorAnime(error));
    } finally {
      yield put(stopAnime());
    }
    return;
  }
  try {
    const result: AnimeResponse = yield call(
      service.animeService.anime,
      action.payload
    );
    const detail: { data: RawAnimeListType[] } = yield call(
      service.animeService.animeDetailByID,
      action.payload
    );
    const formatted: DetailsAnimeList = yield call(
      formatAnimeDetail,
      detail.data
    );
    yield put(setAnime({ anime: result.data, detail: formatted }));
  } catch (err) {
    yield put(setErrorAnime(err));
  } finally {
    yield put(stopAnime());
  }
}
