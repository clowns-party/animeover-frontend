import { DetailsAnimeList, RawAnimeListType } from "bus/UserAnimeList/types";
import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import service from "../../../../services";
import { setAnime, setErrorAnime, startAnime, stopAnime } from "../../actions";
import { AnimeResponse, getAnimeType } from "../../types";
import { formatAnimeDetail } from "../../../../utils/anime/formatAnimeDetail";

export function* animeWorker(action: getAnimeType): SagaIterator {
  yield put(startAnime());
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
