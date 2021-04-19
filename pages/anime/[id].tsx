import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAnime, removeAnimeState } from "../../src/bus/anime/actions";
import { Anime } from "../../src/Elements/anime/Anime";
import { HeaderAnime } from "../../src/Elements/header/HeaderAnime";

const AnimePage: FC = () => {
  const dispatch = useDispatch();
  const {
    query: { id },
  } = useRouter();
  useEffect(() => {
    dispatch(getAnime(id));
    return () => {
      dispatch(removeAnimeState());
    };
  }, []);

  return (
    <div>
      <HeaderAnime />
      <Anime />;
    </div>
  );
};

export default AnimePage;
