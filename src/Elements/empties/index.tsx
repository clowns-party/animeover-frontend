import { BaseButton } from "stories/BaseButton";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const EmptyDefault = styled.div`
  width: 100%;
  height: auto;
  background: white;
  border-radius: 10px;
  display: grid;
  grid-column: 1 / -1;
  flex-direction: column;
  justify-items: center;

  h2 {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 10px;
  }
  button {
    margin-bottom: 30px;
  }
`;

const EmptyWithBg = styled(EmptyDefault)`
  background-image: url("/not_found_bg.jpg");
  background-position: right bottom;
  background-size: contain;
  background-repeat: no-repeat;
`;

const CenteredEmpty = styled(EmptyDefault)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Empties = () => {
  return (
    <EmptyWithBg>
      <h2>Oops...</h2>
      <p>Nothing was found for your request.</p>
      <Link href="/anime">
        <BaseButton>Go back</BaseButton>
      </Link>
    </EmptyWithBg>
  );
};

Empties.End = () => {
  return (
    <EmptyDefault>
      <h2>👀</h2>
      <p>The results with such a filter are over!</p>
      <Link href="/anime">
        <BaseButton>Go back</BaseButton>
      </Link>
    </EmptyDefault>
  );
};

Empties.Comments = () => {
  return (
    <CenteredEmpty>
      <h2>👀</h2>
      <p>
        There are no reviews here yet, you can add anime to your list and leave
        a review!
      </p>
    </CenteredEmpty>
  );
};

export default Empties;
