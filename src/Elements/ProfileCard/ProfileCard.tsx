import { UserOutlined } from "@ant-design/icons";
import { useLogout } from "bus/auth/hooks/useLogout";
import { ProfileForm } from "bus/profile/form/ProfileForm";
import { BaseButton, ButtonType } from "stories/BaseButton";
import React, { FC } from "react";
import styled from "styled-components";
import imgOnLoad from "utils/common/imgOnLoad";
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
  .btns {
    margin-top: 25px;
    display: flex;
    .btn {
      margin-right: 5px;
    }
  }
`;

export const ProfileCard: FC<Props> = ({ user }) => {
  const logout = useLogout();
  const [showEdit, setShowEdit] = React.useState(false);
  const imgUri = imgOnLoad(user?.photoURL, "/user.svg");
  const toggle = () => {
    setShowEdit(!showEdit);
  };

  return (
    <Card>
      <Avatar>
        <img src={imgUri} alt="user" />
      </Avatar>
      {!showEdit ? (
        <Info>
          <h2>{user?.displayName}</h2>
          <h3>{user?.email}</h3>
          <div className="btns">
            <BaseButton
              typeComponent={ButtonType.default}
              className="btn"
              onClick={toggle}
            >
              Edit
            </BaseButton>
            <BaseButton typeComponent={ButtonType.danger} onClick={logout}>
              Exit
            </BaseButton>
          </div>
        </Info>
      ) : (
        <ProfileForm toggle={toggle} />
      )}
    </Card>
  );
};
