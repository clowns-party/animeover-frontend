import { changePage } from "bus/anime/actions";
import { useAnime } from "bus/anime/hooks/useAnime";
import { Header } from "Elements/header";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Col, Pagination, Row } from "antd";
import AnimeFilters from "bus/filters";
import { AnimeCards } from "Elements/HomePage/animeList/AnimeCards";
import Loader from "Elements/loader";
import { ROUTES } from "utils/routes";
import styled from "styled-components";
import { applyFilters } from "utils/anime/applyFilters";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 20px;
`;

const AnimePage = () => {
  const router = useRouter();
  const { animeList, isFetching, totalPages, filtered, filters } = useAnime();
  const [globalSearch, setGlobalSearch] = useState(false);

  const { list: apply, messageResult } = React.useMemo(
    () => applyFilters(animeList, filters),
    [globalSearch, animeList, filters]
  );

  const list = globalSearch ? filtered : apply;

  const { query } = useRouter();
  const page = Number(query?.page || 0);
  const { pageLimit } = useAnime();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePage({ limit: pageLimit, page }));
  }, []);
  const updatePage = (page: number) => {
    dispatch(changePage({ limit: pageLimit, page }));
    router.push(ROUTES.animeByPage(page.toString()));
  };
  const setChecked = (active: boolean) => {
    setGlobalSearch(active);
  };

  return (
    <>
      <Header />
      <Row justify="center">
        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
          <h2>{!globalSearch && messageResult}</h2>
          <Loader loading={isFetching} />
          <Container>
            <AnimeCards animeList={list} />
          </Container>
        </Col>
        <Col>
          <AnimeFilters globalSearch={globalSearch} setChecked={setChecked} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination
            defaultCurrent={page}
            total={totalPages}
            current={page}
            onChange={updatePage}
          />
        </Col>
      </Row>
    </>
  );
};

export default AnimePage;
