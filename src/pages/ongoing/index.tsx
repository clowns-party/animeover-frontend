import { getOngoingList } from "bus/anime/actions";
import { useAnime } from "bus/anime/hooks/useAnime";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "utils/hooks/useToast";
import CustomizeAnimePage from "bus/anime";
import Head from "next/head";

const OngoingPage = () => {
  const { ongoing, error } = useAnime();

  const msg = error ? `${error?.code || "Some errors when fetching"}` : "";
  useToast(msg, 3, "error");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOngoingList());
  }, []);

  return (
    <>
      <Head>
        <title>Animeover | Ongoing</title>
      </Head>
      <CustomizeAnimePage list={ongoing} withFilters={false} />
    </>
  );
};

export default OngoingPage;
