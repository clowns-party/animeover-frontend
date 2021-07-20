import React from "react";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";

const Body = styled.div`
  background-image: url("/girl.jpg");
  background-position: right bottom;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1100px) {
    background-size: 30%;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

// const Girl = styled.div`
//   display: inline-block;
//   background-image: url("/girl.png");
//   background-repeat: no-repeat;
//   background-size: 100%;
//   width: 100px;
//   height: 200px;
//   position: absolute;
//   right: 0;
//   z-index: 999;
// `;

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
