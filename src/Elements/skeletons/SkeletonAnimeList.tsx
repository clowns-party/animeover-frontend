import React from "react";
import { Card, Skeleton } from "antd";
import styled from "styled-components";

const CardStyled = styled(Card)`
  width: 200px;
  margin-bottom: 20px !important;
  border-radius: 20px !important;
  img {
    border-radius: 20px 20px 0 0 !important;
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
            cover={
              <Skeleton.Avatar
                active
                style={{
                  width: 200,
                  height: 250,
                  borderRadius: "20px 20px 0 0",
                }}
                shape="square"
              />
            }
          >
            <Skeleton.Input
              active
              style={{ width: 174, height: 25, borderRadius: 6 }}
            />
            <Skeleton.Input
              active
              style={{ width: 40, height: 25, borderRadius: 6, marginTop: 4 }}
            />
          </CardStyled>
        );
      })}
    </>
  );
};
