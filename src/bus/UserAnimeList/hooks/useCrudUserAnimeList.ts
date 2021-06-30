import { useAuth } from "bus/auth/hooks/useAuth";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/rootReducer";
import {
  getUserAnimeList,
  changeAnimeUserList,
  removeAnimeUserListById,
} from "../actions";
import { animeInUserList, userAnimeListState } from "../reducer";
import { UserAnimeListStatuses } from "../types";

export const useCrudUserAnimeList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const animeId = router.query.id.toString();
  const { isFetching } = useSelector(userAnimeListState);
  const inList = useSelector((state: AppState) =>
    animeInUserList(state, animeId)
  );
  const { data, isFetching: loadingUser } = useAuth();
  const user = data?.user;
  React.useEffect(() => {
    if (user) {
      dispatch(getUserAnimeList());
    }
  }, [user]);

  const onChange = async (status: UserAnimeListStatuses) => {
    const form = {
      animeId,
      status,
    };
    dispatch(changeAnimeUserList(form));
  };

  const onRemove = async () => {
    dispatch(removeAnimeUserListById(animeId));
  };

  return {
    isFetching: isFetching || loadingUser,
    loadingUser,
    user,
    inList,
    onChange,
    onRemove,
  };
};
