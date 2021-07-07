import { Row, Col } from "antd";
import AnimeFilters from "bus/filters";
import { Header } from "Elements/header";
import { AnimeCards } from "Elements/HomePage/animeList/AnimeCards";
import InfiniteScroll, {
  StateInfiniteScroll,
} from "Elements/HomePage/animeList/InfiniteScroll";
import Loader from "Elements/loader";
import { useRouter } from "next/dist/client/router";
import React, { useState, useEffect } from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { routeFilters } from "utils/anime/routeFilters";
import { useToast } from "utils/hooks/useToast";
import { ROUTES } from "utils/routes";
import { changePage } from "./actions";
import { useAnime } from "./hooks/useAnime";
import { AnimeList } from "./types";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 20px;
`;

type Props = {
  list: AnimeList;
  isGlobalSearch?: boolean;
  infinite?: boolean;
  type?: StateInfiniteScroll["type"];
};

const CustomizeAnimePage: FC<Props> = ({
  list,
  isGlobalSearch = false,
  infinite = false,
  type,
}) => {
  const history = useRouter();
  const { isFetching, error, filters } = useAnime();
  const [globalSearch] = useState(isGlobalSearch);

  const msg = error ? `${error?.code || "Some errors when fetching"}` : "";
  useToast(msg, 3, "error");

  const setGlobalSearch = () => {
    history.push(routeFilters(filters?.season, filters?.tag));
  };

  return (
    <>
      <Header />
      <Row justify="center">
        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
          {infinite ? (
            <>
              <Container>
                <InfiniteScroll type={type} />
              </Container>
              <Loader loading={isFetching} />
            </>
          ) : (
            <>
              <Loader loading={isFetching} />
              <Container>
                <AnimeCards animeList={list} />
              </Container>
            </>
          )}
        </Col>

        <Col>
          <AnimeFilters
            globalSearch={globalSearch}
            setGlobalSearch={setGlobalSearch}
            offChoiceGlobal={isGlobalSearch}
          />
        </Col>
      </Row>
    </>
  );
};

export default CustomizeAnimePage;
