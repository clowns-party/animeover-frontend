import React from "react";
import { Card, Skeleton } from "antd";
import styled from "styled-components";

const CardStyled = styled(Card)`
  width: 100%;
  margin-bottom: 20px !important;
  border-radius: 20px !important;
  .ant-card-body {
    display: flex !important;
    flex-direction: column !important;
  }
  img {
    border-radius: 20px 20px 0 0 !important;
  }
`;

export const SkeletonComments = () => {
  const fakeArray = Array.from(Array(3).keys());

  return (
    <>
      {fakeArray.map((el) => {
        return (
          <CardStyled key={el} size="small" hoverable>
            <Skeleton.Input
              active
              style={{ width: 40, height: 25, borderRadius: 6 }}
            />
            <Skeleton.Input
              active
              style={{ width: 174, height: 25, borderRadius: 6, marginTop: 4 }}
            />
          </CardStyled>
        );
      })}
    </>
  );
};
