import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAnime } from "bus/anime/actions";
import { Anime } from "Elements/anime/Anime";
import { HeaderAnime } from "Elements/header/HeaderAnime";

const AnimePage: FC = () => {
  const dispatch = useDispatch();
  const {
    query: { id },
  } = useRouter();
  useEffect(() => {
    dispatch(getAnime(id));
  }, []);

  return (
    <div>
      <HeaderAnime />
      <Anime />;
    </div>
  );
};

export default AnimePage;
