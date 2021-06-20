import React from "react";
import styled from "styled-components";
import { BaseButton } from "Elements/Base/Button/BaseButton";
import { BaseProfileCardStyle } from "Elements/ProfileCard/ProfileCard";
import { getUserAnimeList } from "bus/UserAnimeList/actions";
import { useDispatch } from "react-redux";
import { UserAnimeList } from "bus/UserAnimeList/UserAnimeList";

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
  min-height: 600px;
`;

export const ProfileAnimeList = () => {
  const dispatch = useDispatch();
  const onLoad = () => {
    dispatch(getUserAnimeList());
  };
  return (
    <Container>
      <Card>
        <BaseButton onClick={onLoad} type="button">
          Load test
        </BaseButton>
        <UserAnimeList />
      </Card>
    </Container>
  );
};
