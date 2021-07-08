import AnimeFilters from "bus/filters";
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
};
const Wrap = styled.div`
  display: flex;
`;

const List = styled.div`
  width: 80%;
`;

const Filters = styled.div``;

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
          <Filters>
            <AnimeFilters
              globalSearch={globalSearch}
              setGlobalSearch={setGlobalSearch}
              offChoiceGlobal={isGlobalSearch}
            />
          </Filters>
        </Wrap>
      </Container>
    </>
  );
};

export default CustomizeAnimePage;
