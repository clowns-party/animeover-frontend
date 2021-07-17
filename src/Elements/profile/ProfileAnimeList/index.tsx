import React from "react";
import styled from "styled-components";
import { BaseProfileCardStyle } from "Elements/profile/ProfileCard/ProfileCard";
import { getUserAnimeList } from "bus/UserAnimeList/actions";
import { useDispatch } from "react-redux";
import { UserAnimeList } from "bus/UserAnimeList";

const Container = styled.div`
  display: block;
  flex: 0 0 50%;
  max-width: 50%;
  @media (max-width: 768px) {
    flex: auto;
    max-width: 100%;
    width: 100%;
  }
`;

const Card = styled(BaseProfileCardStyle)`
  height: 100%;
  flex-direction: column;
  min-height: 655px;
  max-height: 655px;
  overflow: hidden;
  overflow-y: scroll;
`;

export const ProfileAnimeList = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUserAnimeList());
  }, []);

  return (
    <Container>
      <Card>
        <UserAnimeList />
      </Card>
    </Container>
  );
};
