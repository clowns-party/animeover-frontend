import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 1rem;
`;
const Wrap = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  flex-basis: auto;
  flex-wrap: wrap;
`;
export const ProfileContainer: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Container>
      <Wrap>{children}</Wrap>
    </Container>
  );
};
