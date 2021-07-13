import { Card, Col, Row, Skeleton, Tooltip } from "antd";
import React, { FC } from "react";
import Router from "next/router";
import styled from "styled-components";
import { useAnime } from "../../../bus/anime/hooks/useAnime";
import styles from "./listOngoing.module.scss";

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
const Point = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 100%;
    background: ${(props) => (props.active ? "#ff6666" : "#fff")};
    border: ${(props) => (props.active ? "none" : "3px solid #8c929d")};
    box-sizing: border-box;
  }
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

const timeList = [
  { time: "01:00", active: true },
  { time: "13:00", active: true },
  { time: "15:15", active: true },
  { time: "15:30", active: false },
  { time: "16:00", active: false },
];

export const ListOngoing: FC = () => {
  const { ongoing, isFetching, error } = useAnime();
  return (
    <div className={styles.container}>
      <Row style={{ margin: "16px 0" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Title>Ongoing Calendar</Title>
          <Year>See Fall 2021 Lineup</Year>
          <Today>TODAY 12/07</Today>
        </Col>
        <Col xs={24}>
          <Release>
            {timeList?.map((el, index) => {
              return (
                <React.Fragment key={index.toString()}>
                  <Point active={el.active}>
                    <Time active={el.active}>{el?.time}</Time>
                    <span />
                  </Point>
                  {index + 1 < timeList?.length && <Line active={el.active} />}
                </React.Fragment>
              );
            })}
          </Release>
        </Col>
      </Row>
      <Row className={styles.ongoing_container}>
        {ongoing?.length ? (
          ongoing.map(
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
        cover={<img className={styles.anime} alt="anime" src={el.picture} />}
      >
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
