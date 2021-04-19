import { Card, Col, Row, Skeleton, Tooltip } from "antd";
import React, { FC } from "react";
import Router from "next/router";
import { useAnime } from "../../../bus/anime/hooks/useAnime";
import styles from "./listOngoing.module.scss";

export const ListOngoing: FC = () => {
  const { ongoing, isFetching, error } = useAnime();

  return (
    <div className={styles.container}>
      <Row style={{ margin: "16px 0" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className={styles.header}>
            <span />
            ОНГОИНГИ
          </div>
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
        cover={
          <img
            className={styles.anime}
            alt="anime"
            src={`https://shikimori.one/${el.picture}`}
          />
        }
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
          cover={<Skeleton.Avatar active size={142} shape="square" />}
        >
          <Skeleton title active paragraph={{ rows: 1 }} />
        </Card>
      ))}
    </>
  );
};
