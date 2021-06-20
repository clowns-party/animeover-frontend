import React, { FC } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
// Components
import styled from "styled-components";
import { ProfileContainer } from "Elements/Base/Containers/ProfileContainer";
import { ProfileAnimeList } from "Elements/profile/ProfileAnimeList";
import { Header } from "../../Elements/header";
import {
  BaseProfileCardStyle,
  ProfileCard,
} from "../../Elements/ProfileCard/ProfileCard";
// Hooks
import { useServerSideSecure } from "../auth/hooks/useServerSideSecure";
// Types
import { User } from "../auth/types";

const ProfileColumnCards = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  flex: 1 1 auto;
  max-width: 50%;
  flex-basis: auto;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    margin-right: 0px;
    flex: auto;
    max-width: 100%;
    width: 100%;
  }
`;

const HistoryCard = styled(BaseProfileCardStyle)`
  margin-top: 68px;
  height: 295px;
  margin-bottom: 68px;
`;

type Props = {
  user: User["user"] | null;
};
const Profile: FC<Props> = ({ user }) => {
  return (
    <>
      <Header />
      <ProfileContainer>
        <ProfileColumnCards>
          <ProfileCard user={user} />
          <HistoryCard>history</HistoryCard>
        </ProfileColumnCards>
        <ProfileAnimeList />
      </ProfileContainer>
    </>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const res = await useServerSideSecure(context);
  return res;
};
