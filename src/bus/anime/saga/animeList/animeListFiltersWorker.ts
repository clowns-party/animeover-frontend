import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { AppState } from "../../../../redux/rootReducer";
import { fetchWithFiltersType, AnimeListReponse } from "../../types";
import { service } from "../../../../Services";
import {
  setErrorAnime,
  setFiltered,
  startAnime,
  stopAnime,
} from "../../actions";

export function* animeListFiltersWorker(
  action: fetchWithFiltersType
): SagaIterator {
  const page = yield select((state: AppState) => state.anime.currentPage);
  const limit = 20;
  const { payload } = action;
  const filters = {
    ...payload,
  };
  delete filters.tag;
  if (filters.season === "-") {
    delete filters.season;
  }
  if (filters.tags === "-") {
    delete filters.tags;
  }
  yield put(startAnime());

  try {
    const result: AnimeListReponse = yield call(
      service.animeService.animeList,
      limit,
      page,
      filters
    );
    yield put(
      setFiltered({
        animeList: result.data.animeList,
        filters: payload,
      })
    );
  } catch (err) {
    yield put(setErrorAnime(err?.response?.data));
  } finally {
    yield put(stopAnime());
  }
}
