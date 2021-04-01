import { Card, Col, Row, Skeleton, Tooltip } from "antd";
import React, { FC } from "react";
import { useAnimelist } from "../../../bus/anime/hooks/useAnimeList";
import styles from "./listOngoing.module.scss";

export const ListOngoing: FC = () => {
  const { anime, ongoing, isFetching, error } = useAnimelist();

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
            (el, index) => index <= 7 && <Ongoing key={el._id} el={el} />
          )
        ) : (
          <Skeletons />
        )}
      </Row>
    </div>
  );
};

const Ongoing = ({ el }) => {
  const { Meta } = Card;
  return (
    <Tooltip placement="right" title={<TitleOngoing el={el} />}>
      <Card
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
  return (
    <div>
      <div>{el.title}</div>
      <div>
        Тип: <span>{el.type}, </span>
        {el.animeSeason.season != "UNDEFINED" ? (
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
        {el.tags.map((t, index: number) => {
          if (el.tags.length > 5 && index === 4) {
            return <span key={index.toString()}>{t}... </span>;
          }
          if (el.tags.length === index + 1 && index <= 4) {
            return <span key={index.toString()}>{t}</span>;
          }
          if (index <= 4) {
            return <span key={index.toString()}>{t}, </span>;
          }
        })}
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
