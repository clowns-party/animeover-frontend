import React from "react";
import { Card, Skeleton } from "antd";
import styled from "styled-components";

const CardStyled = styled(Card)`
  width: 100%;
  max-width: 200px;
  margin-bottom: 20px !important;
  border-radius: 20px !important;
  img {
    border-radius: 20px 20px 0 0 !important;
  }
`;

const Avatar = styled(Skeleton.Avatar)`
  &.ant-skeleton-element {
    display: flex !important;
  }
  &.ant-skeleton-avatar {
    display: block !important;
    width: 100% !important;
    min-width: 100% !important;
    max-width: 200px;
    height: 250px !important;
    border-radius: 20px 20px 0 0;
    @media screen and (max-width: 532px) {
      height: 160px !important;
    }
    @media screen and (max-width: 429px) {
      height: 200px !important;
    }
  }
`;

const Input = styled(Skeleton.Input)`
  &.ant-skeleton-element {
    display: flex !important;
  }
`;

export const SkeletonAnimeList = () => {
  const fakeArray = Array.from(Array(10).keys());

  return (
    <>
      {fakeArray.map((el) => {
        return (
          <CardStyled
            key={el}
            size="small"
            hoverable
            cover={<Avatar active shape="square" />}
          >
            <Input active style={{ width: 174, height: 25, borderRadius: 6 }} />
            <Input
              active
              style={{ width: 40, height: 25, borderRadius: 6, marginTop: 4 }}
            />
          </CardStyled>
        );
      })}
    </>
  );
};
