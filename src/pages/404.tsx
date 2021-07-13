import React from "react";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";

const Body = styled.div`
  background-image: url("/not_found_bg.jpg");
  background-position: right bottom;
  background-size: 50%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    background-size: contain;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
`;

const Error = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 44px;
  color: #2c2738;
  margin-bottom: 20px;
  @media screen and (max-width: 400px) {
    font-size: 28px;
  }
`;
const Button = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 44px;
  color: #fff;
  background: #000;
  padding: 0 20px;
  border-radius: 4px;
  cursor: pointer;
`;

export default function Custom404() {
  const router = useRouter();
  return (
    <Container>
      <Body>
        <Error>404 - Page Not Found</Error>
        <Button onClick={() => router.push("/")}>Go to home</Button>
      </Body>
    </Container>
  );
}
