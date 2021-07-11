import styled from "styled-components";

import React, { FC } from "react";

const Empty = styled.div`
  @media (max-width: 768px) {
    margin-top: 200px;
    display: block;
    height: 1px;
  }
`;

type Props = {
  children: React.ReactNode;
};
export const BottomLayout: FC<Props> = ({ children }) => {
  return (
    <>
      {children}
      <Empty />
    </>
  );
};
