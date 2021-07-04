import { changePage } from "bus/anime/actions";
import { useAnime } from "bus/anime/hooks/useAnime";
import { Header } from "Elements/header";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Col, Row } from "antd";
import AnimeFilters from "bus/filters";
import { AnimeCards } from "Elements/HomePage/animeList/AnimeCards";
import Loader from "Elements/loader";

const AnimePage = () => {
  const { animeList, isFetching, totalPages, filtered } = useAnime();
  const list = filtered || animeList;

  const { query } = useRouter();
  const page = Number(query?.page || 0);
  const { pageLimit } = useAnime();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changePage({ limit: pageLimit, page }));
  }, []);
  return (
    <>
      <Header />
      <Row justify="center">
        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
          <Loader loading={isFetching} />
          <AnimeCards animeList={list} />
          <h2>pages: {totalPages}</h2>
        </Col>
        <Col>
          <AnimeFilters />
        </Col>
      </Row>
    </>
  );
};

export default AnimePage;
