import AnimeFilters from "bus/filters";
import { Suggestions } from "bus/filters/Suggestions";
import { Header } from "Elements/header";
import { AnimeCards } from "Elements/HomePage/animeList/AnimeCards";
import InfiniteScroll, {
  StateInfiniteScroll,
} from "Elements/HomePage/animeList/InfiniteScroll";
import Container from "Elements/layout/Container";
import Loader from "Elements/loader";
import { useRouter } from "next/dist/client/router";
import React, { useState, FC } from "react";
import styled from "styled-components";
import { routeFilters } from "utils/anime/routeFilters";
import { useToast } from "utils/hooks/useToast";
import { useAnime } from "./hooks/useAnime";
import { AnimeList } from "./types";

type Props = {
  list: AnimeList;
  isGlobalSearch?: boolean;
  infinite?: boolean;
  type?: StateInfiniteScroll["type"];
  withFilters?: boolean;
};
const Wrap = styled.div`
  display: flex;
`;

const List = styled.div`
  width: 80%;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const Filters = styled.div`
  @media (max-width: 576px) {
    display: none;
  }
`;

const CustomizeAnimePage: FC<Props> = ({
  list,
  isGlobalSearch = false,
  infinite = false,
  withFilters = true,
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
      <Suggestions />
      <Container>
        <Wrap>
          <List>
            {infinite ? (
              <InfiniteScroll type={type} />
            ) : (
              <>
                <Loader loading={isFetching} />
                <AnimeCards animeList={list} />
              </>
            )}
          </List>
          {withFilters && (
            <Filters>
              <AnimeFilters
                globalSearch={globalSearch}
                setGlobalSearch={setGlobalSearch}
                offChoiceGlobal={isGlobalSearch}
              />
            </Filters>
          )}
        </Wrap>
      </Container>
    </>
  );
};

export default CustomizeAnimePage;
