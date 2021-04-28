import React, { FC } from "react";
import { Button, Col, Row, Form, Input } from "antd";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
// Components
import { HeaderAnime } from "../../Elements/header/HeaderAnime";
import { ProfileCard } from "../../Elements/ProfileCard/ProfileCard";
import { UserAnimeList } from "../UserAnimeList/UserAnimeList";
// Hooks
import { useServerSideSecure } from "../auth/hooks/useServerSideSecure";
// Types
import { User } from "../auth/types";
import style from "./Profile.module.scss";

type Props = {
  user: User["user"] | null;
};
const Profile: FC<Props> = ({ user }) => {
  return (
    <>
      <HeaderAnime />
      <div className={style.container}>
        <Row gutter={24} justify="center">
          <Col span={6}>
            <ProfileCard user={user} />
          </Col>
          <Col span={14}>
            <ProfileForm />
          </Col>
          <Col span={20}>
            <UserAnimeList />
          </Col>
        </Row>
      </div>
    </>
  );
};

const ProfileForm = () => {
  return (
    <Form name="basic" initialValues={{ remember: true }}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { user } = await useServerSideSecure(context);
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { user },
  };
};
