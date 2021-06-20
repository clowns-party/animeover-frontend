/* eslint-disable jsx-a11y/label-has-associated-control */
import { UserOutlined } from "@ant-design/icons";
import { Breakpoint } from "antd/lib/_util/responsiveObserve";
import { BaseButton, ButtonType } from "Elements/Base/Button/BaseButton";
import { BaseInput } from "Elements/Base/Input/BaseInput";
import React, { FC } from "react";
import styled from "styled-components";
import { User } from "../../bus/auth/types";

type Props = {
  user: User["user"] | null;
};
export const BaseProfileCardStyle = styled.div`
  padding: 17px;
  background: #ffffff;
  border-radius: 19px;
  display: flex;
`;
const Card = styled(BaseProfileCardStyle)`
  width: auto;
  min-height: 295px;
  flex-wrap: wrap;
`;
const Avatar = styled.div`
  overflow: hidden;
  width: 66px;
  height: 67px;
  border-radius: 50%;
  border: 1px solid #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  transition: 0.3s all ease;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  margin-right: 36px;
`;

const Info = styled.div`
  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 31px;
    color: #000000;
  }
  h3 {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: #9c9898;
  }
  .btn {
    margin-top: 25px;
  }
`;

export const ProfileCard: FC<Props> = ({ user }) => {
  const [showEdit, setShowEdit] = React.useState(false);
  const imgUri = user?.photoURL;
  const toggle = () => {
    setShowEdit(!showEdit);
  };
  return (
    <Card>
      <Avatar>
        {imgUri ? <img src={imgUri} alt="user" /> : <UserOutlined />}
      </Avatar>
      {!showEdit ? (
        <Info>
          <h2>{user?.displayName}</h2>
          <h3>{user?.email}</h3>
          <BaseButton
            typeComponent={ButtonType.default}
            className="btn"
            onClick={toggle}
          >
            Edit
          </BaseButton>
        </Info>
      ) : (
        <ProfileEditor user={user} toggle={toggle} />
      )}
    </Card>
  );
};

const Form = styled.div`
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 10px;
    width: 100%;
  }
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
`;

type EditorProps = { toggle: () => void } & Props;
const ProfileEditor: FC<EditorProps> = ({ user, toggle }) => {
  return (
    <Form>
      <label>displayName</label>
      <BaseInput value={user.displayName} />
      <label>email</label>
      <BaseInput value={user.email} />
      <label>photoURL</label>
      <BaseInput value={user.photoURL} />
      <BaseButton
        typeComponent={ButtonType.important}
        className="btn"
        onClick={toggle}
      >
        save
      </BaseButton>
    </Form>
  );
};
