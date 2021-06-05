import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Row, Form, Input } from "antd";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getUserAnimeList } from "bus/UserAnimeList/actions";
// Components
import { Header } from "../../Elements/header";
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
  const dispatch = useDispatch();
  const onLoad = () => {
    dispatch(getUserAnimeList());
  };
  return (
    <>
      <Header />
      <div className={style.container}>
        <Row gutter={24} justify="center">
          <Col span={9}>
            <ProfileCard user={user} />
          </Col>
          <Col span={11}>
            <button onClick={onLoad} type="button">
              Load test
            </button>

            {/* <ProfileForm /> */}
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
