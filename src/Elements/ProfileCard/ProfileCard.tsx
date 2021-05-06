import { DownloadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import React, { FC } from "react";
import { User } from "../../bus/auth/types";
import style from "./ProfileCard.module.scss";

type Props = {
  user: User["user"] | null;
};
export const ProfileCard: FC<Props> = ({ user }) => {
  return (
    <Card
      className={style.card}
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
      <div className={style.user_info}>
        <div>
          <div className={style.title}>{user?.displayName}</div>
          <div className={style.descrition}>{user?.email}</div>
        </div>
        <Button
          className={style.button}
          type="primary"
        >
          Edit
        </Button>
      </div>
    </Card>
  );
};
