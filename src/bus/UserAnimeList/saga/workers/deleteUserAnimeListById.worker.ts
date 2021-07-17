import { AppState } from "redux/rootReducer";
import { SagaIterator } from "@redux-saga/types";
import { setAnime } from "bus/anime/actions";
import {
  setErrorAnimeList,
  setUserAnimeList,
  toggleLoadingUserAnimeList,
} from "bus/UserAnimeList/actions";
import {
  DetailsAnimeList,
  RawAnimeListType,
  removeAnimeByIdType,
  ResponseUserAnimeListType,
} from "bus/UserAnimeList/types";
import { call, put, select } from "redux-saga/effects";
import { service } from "services";
import { formatAnimeDetail } from "utils/anime/formatAnimeDetail";
import { Anime } from "bus/anime/types";
import { userAnimelistStorage } from "../../storage/userAnimelist.storage";

export function* deleteUserAnimeListById(
  action: removeAnimeByIdType
): SagaIterator {
  try {
    const currentAnime: Anime = yield select(
      (state: AppState) => state.anime.anime.info
    );
    yield put(toggleLoadingUserAnimeList(true));

    const animeId = action.payload;
    const _original: ResponseUserAnimeListType = yield call(
      service.userService.animeListRemoveItem,
      animeId
    );

    const _originalUpdated = _original.data;
    const storage = userAnimelistStorage();
    const { userAnimeList } = storage.get();

    // Merge diffs
    const updatedUserAnimeList = userAnimeList.filter(
      (anime) => anime._id !== animeId
    );

    // Fetch details
    const detail: { data: RawAnimeListType[] } = yield call(
      service.animeService.animeDetailByID,
      animeId
    );
    const formatted: DetailsAnimeList = yield call(
      formatAnimeDetail,
      detail.data
    );

    const payload = {
      _original: _originalUpdated,
      data: updatedUserAnimeList,
    };
    yield put(setAnime({ anime: currentAnime, detail: formatted }));
    storage.set(payload._original, payload.data);
    yield put(setUserAnimeList(payload));
  } catch (error) {
    yield put(setErrorAnimeList(error));
  } finally {
    yield put(toggleLoadingUserAnimeList(false));
  }
}
