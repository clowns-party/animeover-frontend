import { SagaIterator } from "@redux-saga/types";
import { all, call, takeLatest } from "redux-saga/effects";
import {
  CHANGE_ANIME_USER_LIST,
  GET_USER_ANIME_LIST,
  REMOVE_ANIME_LIST_BY_ID,
} from "../types";
import { changeUserAnimeListWorker } from "./workers/changeUserAnimeList.worker";
import { deleteUserAnimeListById } from "./workers/deleteUserAnimeListById.worker";
import { userAnimeListWorker } from "./workers/userAnimeList.worker";

export function* animeListCRUDWorker(): SagaIterator {
  yield takeLatest(GET_USER_ANIME_LIST, userAnimeListWorker);
  yield takeLatest(CHANGE_ANIME_USER_LIST, changeUserAnimeListWorker);
  yield takeLatest(REMOVE_ANIME_LIST_BY_ID, deleteUserAnimeListById);
}

export function* userAnimeListWatcher(): SagaIterator {
  yield all([call(animeListCRUDWorker)]);
}
