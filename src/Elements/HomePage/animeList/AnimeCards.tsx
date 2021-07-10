import React, { FC } from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { AnimeList } from "bus/anime/types";
import Router from "next/router";
import Picture from "Elements/picture";
import styled from "styled-components";
import { SkeletonAnimeList } from "Elements/skeletons/SkeletonAnimeList";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 20px;
`;

const StyledCard = styled(Card)`
  width: 200px;
  margin-bottom: 20px !important;
  border-radius: 20px !important;
  img {
    border-radius: 20px 20px 0 0 !important;
  }
`;

const StyledPicture = styled(Picture)`
  height: 250px;
  object-fit: cover;
`;
type Props = {
  animeList: AnimeList;
  loading?: boolean;
  children?: React.ReactNode;
};
export const AnimeCards: FC<Props> = ({
  animeList,
  loading = false,
  children,
}) => {
  const animeClicked = (id: string) => {
    Router.push(`/anime/${id}`);
  };

  return (
    <Wrapper>
      {animeList &&
        animeList?.length > 0 &&
        animeList.map((el) => {
          return (
            // если не нужен див, изменить на React.Fragment
            <React.Fragment key={el._id}>
              <StyledCard
                onClick={() => animeClicked(el._id)}
                size="small"
                hoverable
                cover={<StyledPicture alt="anime" url={el.picture} />}
              >
                <Meta title={el.title} description={el.type} />
              </StyledCard>
            </React.Fragment>
          );
        })}
      {loading && <SkeletonAnimeList />}
      {children || ""}
    </Wrapper>
  );
};
