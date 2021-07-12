import styled from "styled-components";

import React, { FC } from "react";
import { Comment, Avatar } from "antd";
import { useAnime } from "bus/anime/hooks/useAnime";
import { DetailsAnimeList } from "bus/UserAnimeList/types";
import Empties from "Elements/empties";
import { SkeletonComments } from "Elements/skeletons/SkeletonComments";

const Container = styled.div``;

const StyledComment = styled(Comment)`
  border: 1px solid #f0f0f0;
  border-radius: 20px;
  margin-bottom: 10px;
  padding-left: 16px;
  padding-right: 16px;
`;

const Comments = () => {
  const { isFetching, details } = useAnime();
  if (isFetching) {
    return <SkeletonComments />;
  }
  return (
    <Container>
      {details?.length ? (
        details.map((detail) => <ItemComment detail={detail} />)
      ) : (
        <Empties.Comments />
      )}
    </Container>
  );
};
type Props = {
  detail: DetailsAnimeList[0];
};

export const ItemComment: FC<Props> = ({ detail }) => {
  return (
    <StyledComment
      author={<a>Anonimus</a>}
      avatar={<Avatar src="/user.svg" alt="user" />}
      content={
        <>
          <p>{detail?.review || "-"}</p>
          <b>Rate : {detail?.star || "-"}</b>
        </>
      }
    />
  );
};

export default Comments;
