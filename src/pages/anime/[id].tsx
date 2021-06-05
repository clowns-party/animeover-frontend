import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAnime } from "bus/anime/actions";
import { Anime } from "Elements/anime/Anime";
import { Header } from "Elements/header";

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
      <Header />
      <Anime />;
    </div>
  );
};

export default AnimePage;
