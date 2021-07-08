import React, { FC } from "react";
import styled from "styled-components";

const Style = styled.div`
  padding: 0 15px;

  @media (min-width: 575.98px) {
    padding: 0 calc(50% - 270px);
  }

  @media (min-width: 767.98px) {
    padding: 0 calc(50% - 360px);
  }

  @media (min-width: 991.98px) {
    padding: 0 calc(50% - 480px);
  }

  @media (min-width: 1199.98px) {
    padding: 0 calc(50% - 590px);
  }
`;
type Props = {
  children: React.ReactNode;
};
const Container: FC<Props> = ({ children }) => {
  return <Style>{children}</Style>;
};

export default Container;
