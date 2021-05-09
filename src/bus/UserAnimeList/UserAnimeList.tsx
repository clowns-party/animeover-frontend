import React, { useEffect } from "react";
import style from "./UserAnimeList.module.scss";
import { useDispatch } from "react-redux";
import { getUserAnimeList } from "bus/auth/actions";
import { useAuth } from "../auth/hooks/useAuth";
import { service } from "../../Services/index";

export const UserAnimeList = () => {
  const dispatch = useDispatch();
  const { userAnimeIsFething, userAnimeList } = useAuth();
  const copy = userAnimeList && JSON.parse(JSON.stringify(userAnimeList));
  const userAnimeWithInfo = copy?.forEach(async (el) => {
    const reslut = await service.animeService.anime(el.id);
    el["info"] = reslut?.data;
  });
  useEffect(() => {
    dispatch(getUserAnimeList());
  }, []);

  return (
    <>
      test
      {userAnimeWithInfo?.map((el) => {
        return (
          <div key={el.id}>
            <div className={style.container_anime}>
              <div className={style.number}>{el.info}</div>
              {/* <div className={style.picture}></div>
              <div className={style.name}></div>
              <div className={style.status}></div>
              <div className={style.menu}></div> */}
            </div>
          </div>
        );
      })}
    </>
  );
};
