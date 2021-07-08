import { changePage } from "bus/anime/actions";
import { useAnime } from "bus/anime/hooks/useAnime";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Pagination } from "antd";
import { ROUTES } from "utils/routes";
import { applyFilters } from "utils/anime/applyFilters";
import { useToast } from "utils/hooks/useToast";
import CustomizeAnimePage from "bus/anime";
import Container from "Elements/layout/Container";

const AnimePage = () => {
  const router = useRouter();
  const { animeList, count, filters, error } = useAnime();

  const { list: apply } = React.useMemo(
    () => applyFilters(animeList, filters),
    [animeList, filters]
  );

  const msg = error ? `${error?.code || "Some errors when fetching"}` : "";
  useToast(msg, 3, "error");

  const list = apply;

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

  return (
    <>
      <CustomizeAnimePage list={list} />
      <Container>
        <Pagination
          defaultCurrent={page}
          total={count}
          current={page}
          pageSize={20}
          onChange={updatePage}
        />
      </Container>
    </>
  );
};

export default AnimePage;
