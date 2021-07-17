import React, { useState } from "react";
import { Rate } from "antd";
import { FC } from "react";
import styled from "styled-components";

type Props = {
  star: number;
  setStar: (value: number) => void;
  disabled?: boolean;
};

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
  p {
    width: fit-content;
    font-size: 20px;
    -moz-transition: all 0.3s;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    max-width: 30px;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
    &:hover {
      -moz-transform: scale(1.1);
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
  }
`;

const RateAnime: FC<Props> = ({ star, setStar, disabled }) => {
  const [emojiStar, setEmojiStar] = useState(0);
  const emojis = {
    0: "🤔",
    1: "💩",
    2: "👺",
    3: "😶",
    4: "😐",
    5: "🤔",
    6: "🤯",
    7: "🙂",
    8: "🙂",
    9: "🙂",
    10: "🤯",
  };
  const changeStar = (val: number) => {
    if (val !== undefined) {
      setStar(val);
      setEmojiStar(val);
    }
  };
  const changeStarEmojiReact = (value: number) => {
    setEmojiStar(value);
  };
  return (
    <Container>
      <Rate
        count={10}
        defaultValue={2}
        onChange={changeStar}
        value={star}
        onHoverChange={changeStarEmojiReact}
        disabled={disabled}
      />
      <p> {emojis[emojiStar || star]}</p>
    </Container>
  );
};

export default RateAnime;
