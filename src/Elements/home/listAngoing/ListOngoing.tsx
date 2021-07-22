import { Card, Col, Row, Skeleton, Tooltip } from "antd";
import React, { FC } from "react";
import Router from "next/router";
import styled from "styled-components";
import { FireOutlined } from "@ant-design/icons";
import { useAnime } from "../../../bus/anime/hooks/useAnime";
import styles from "./listOngoing.module.scss";

const Title = styled.div`
  color: #ff6666;
  font-style: normal;
  font-weight: bold;
  font-family: IBM Plex Sans;
  font-size: 40px;
  @media screen and (max-width: 400px) {
    font-size: 34px;
  }
`;

export const ListOngoing: FC = () => {
  const { ongoing, isFetching, error } = useAnime();
  return (
    <div className={styles.container}>
      <Row style={{ margin: "16px 0" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Title>
            HOT LIST <FireOutlined twoToneColor="#FF6666" />
          </Title>
        </Col>
      </Row>
      <Row className={styles.ongoing_container}>
        {ongoing ? (
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
