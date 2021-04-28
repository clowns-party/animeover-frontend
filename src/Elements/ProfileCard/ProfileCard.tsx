import { UserOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { FC } from "react";
import { User } from "../../bus/auth/types";
import style from "./ProfileCard.module.scss";

type Props = {
  user: User["user"] | null;
};
export const ProfileCard: FC<Props> = ({ user }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <>
          {user?.photoURL ? (
            <img alt="example" src={user?.photoURL} />
          ) : (
            <UserOutlined className={style.avatar} />
          )}
        </>
      }
    >
      <Meta title={user?.displayName} description={user?.email} />
    </Card>
  );
};
