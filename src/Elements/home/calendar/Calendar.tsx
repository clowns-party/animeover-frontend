import { Card, Col, Row, Skeleton, Tooltip } from "antd";
import Picture from "Elements/picture";
import Router from "next/router";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { useAnime } from "../../../bus/anime/hooks/useAnime";
import styles from "./calendar.module.scss";

const Title = styled.div`
  color: #000;
  font-style: normal;
  font-weight: bold;
  font-family: IBM Plex Sans;
  font-size: 40px;
  @media screen and (max-width: 400px) {
    font-size: 34px;
  }
`;

const Year = styled.div`
  color: #ff6666;
  font-style: normal;
  font-weight: bold;
  font-family: IBM Plex Sans;
  font-size: 18px;
`;

const Today = styled.div`
  color: #000;
  font-style: normal;
  font-weight: bold;
  font-family: IBM Plex Sans;
  font-size: 20px;
  margin: 20px 0 12px 0;
`;

const Release = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
const Point = styled.div<{ active?: boolean; current: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  span {
    width: 12px;
    height: 12px;
    position: relative;
    background: ${(props) => (props.active ? "#ff6666" : "#fff")};
    border-radius: 50%;

    &:before,
    &:after {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      background-color: transparent;
      border-radius: 50%;
      border: ${(props) => (props.active ? "none" : "2px solid #8c929d")};
      box-shadow: ${(props) =>
        props.current ? "0 0 1px 1px rgba(170, 77, 200, 0.4)" : "none"};
    }

    &:before {
      animation: ${(props) =>
        props.current ? "euiBeaconPulseLarge 2.5s infinite ease-out;" : "none"};
    }

    &:after {
      animation: ${(props) =>
        props.current ? "euiBeaconPulseLarge 2.5s infinite ease-out;" : "none"};
    }
    &:hover {
      animation: none;
    }
  }
  @keyframes euiBeaconPulseLarge {
    0% {
      transform: scale(0.1);
      opacity: 1;
    }

    70% {
      transform: scale(3);
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes euiBeaconPulseSmall {
    0% {
      transform: scale(0.1);
      opacity: 1;
    }

    70% {
      transform: scale(2);
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 0 4px;
  } ;
`;
const Time = styled.div<{ active?: boolean }>`
  color: ${(props) => (props.active ? "#ff6666" : "#8c929d")};
  font-style: normal;
  font-weight: bold;
  font-family: IBM Plex Sans;
  font-size: 14px;
`;
const Line = styled.span<{ active?: boolean }>`
  display: inline-block;
  height: 2px;
  width: 10rem;
  background: ${(props) => (props.active ? "#ff6666" : "#8c929d")};
  margin-bottom: 9px;
`;

const Prompt = styled.div`
  color: #bfbfbf;
  font-style: normal;
  font-weight: bold;
  font-family: IBM Plex Sans;
  font-size: 14px;
`;

const daysList = [
  { day: "Monday", id: 1 },
  { day: "Tuesday", id: 2 },
  { day: "Wednesday", id: 3 },
  { day: "Thursday", id: 4 },
  { day: "Friday", id: 5 },
  { day: "Saturday", id: 6 },
  { day: "Sunday", id: 7 },
];

const formatDate = (date: number) => {
  if (String(date)?.length < 2) return `0${date}`;
  return date;
};

export const Calendar: FC = () => {
  const { shedule, isFetching, error } = useAnime();
  const date = new Date();
  const [dayNumber, setDayNumber] = useState(date?.getDay());
  const [day, setDay] = useState(
    new Intl.DateTimeFormat("en-US", { weekday: "long" })
      .format(date)
      .toUpperCase()
  );
  const changeOngoingList = (value: string, dayNum) => {
    setDayNumber(dayNum);
    setDay(value.toUpperCase());
  };

  const getCurrectName = (name) => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        return name.substring(0, 2);
      }
      return name;
    }
    return name;
  };

  return (
    <div className={styles.container}>
      <Row style={{ margin: "16px 0" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Title>ANIME CALENDAR</Title>
          <Year>{`See Fall ${date?.getFullYear()} Lineup`}</Year>
          <Prompt>See what comes out any day of the week</Prompt>
          <Today>
            {`TODAY ${formatDate(date?.getDate())}/${formatDate(
              date?.getMonth() + 1
            )}`}
          </Today>
        </Col>
        <Col xs={24}>
          <Release>
            {daysList?.map((el, index) => {
              return (
                <React.Fragment key={index.toString()}>
                  {index + 1 !== 1 && <Line active={el?.id <= dayNumber} />}
                  <Point
                    active={el?.id <= dayNumber}
                    current={el?.id === dayNumber}
                    onClick={() => changeOngoingList(el?.day, el?.id)}
                  >
                    <Time active={el?.id <= dayNumber}>
                      {getCurrectName(el?.day)}
                    </Time>
                    <span />
                  </Point>
                </React.Fragment>
              );
            })}
          </Release>
        </Col>
      </Row>
      <Row className={styles.ongoing_container}>
        {shedule ? (
          shedule[day]?.map(
            (el, index) =>
              index <= 7 && <Ongoing key={el._id} id={el._id} el={el} />
          )
        ) : (
          <Skeletons />
        )}
      </Row>
    </div>
  );
};

const Ongoing = ({ el, id }) => {
  const { Meta } = Card;
  const ongoingCliced = () => {
    Router.push(`/anime/${id}`);
  };
  return (
    <Tooltip placement="right" title={<TitleOngoing el={el} />}>
      <Card
        onClick={() => ongoingCliced()}
        className={styles.card}
        size="small"
        hoverable
        cover={
          <Picture
            className={styles.anime}
            url={el.picture}
            alt={el?.title || "anime"}
          />
        }
      >
        {/* ref={imgRef} */}
        <Meta title={el.title} description={el.type} />
      </Card>
    </Tooltip>
  );
};

const TitleOngoing = ({ el }) => {
  const symbolIterate = (index: number, length: number, max: number) =>
    index === length - 1 || index === max;
  return (
    <div>
      <div>{el.title}</div>
      <div>
        Тип: <span>{el.type}, </span>
        {el.animeSeason.season !== "UNDEFINED" ? (
          <span>{el.animeSeason.season}, </span>
        ) : (
          ""
        )}
        <span>{el.animeSeason.year}, </span>
        <span>{el.status}, </span>
      </div>
      <div>Эпизоды: {el.episodes}</div>
      <div>
        <span>Жанры: </span>
        {/* // вынести */}
        {el.tags.map(
          (t, index: number) =>
            index <= 5 && (
              <span key={index.toString()}>
                {t}
                {symbolIterate(index, el.tags.length, 5) ? "" : ", "}
              </span>
            )
        )}
        <span>...</span>
      </div>
    </div>
  );
};

const Avatar = styled(Skeleton.Avatar)`
  &.ant-skeleton-element {
    display: flex !important;
  }
  &.ant-skeleton-avatar {
    display: block !important;
    width: 100% !important;
    min-width: 100% !important;
    max-width: 142px;
    height: 180px !important;
    border-radius: 20px 20px 0 0;
    @media screen and (max-width: 800px) {
      height: 160px !important;
    }
  }
`;

const Skeletons: FC = () => {
  const temp = Array.from(Array(8).keys());
  return (
    <>
      {temp.map((el) => (
        <Card
          className={styles.card}
          key={el}
          size="small"
          hoverable
          cover={<Avatar active shape="square" />}
        >
          <Skeleton title active paragraph={{ rows: 1 }} />
        </Card>
      ))}
    </>
  );
};
