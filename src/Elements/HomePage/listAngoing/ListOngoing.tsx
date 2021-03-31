import { Card, Col, Row, Skeleton, Tooltip } from "antd";
import Image from "next/image";
import React, { FC } from "react";
import { useAnimelist } from "../../../bus/anime/hooks/useAnimeList";
import styles from "./listOngoing.module.scss";

export const ListOngoing: FC = () => {
  const { anime, ongoing, isFetching, error } = useAnimelist();
  const { Meta } = Card;

  return (
    <div className={styles.container}>
      <Row style={{ margin: "16px 0" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className={styles.header}>
            <span></span>
            ОНГОИНГИ
          </div>
        </Col>
      </Row>
      <Row className={styles.ongoing_container}>
        {ongoing?.length
          ? ongoing.map((el, index) => {
              if (index <= 7) {
                return (
                  <div key={el._id}>
                    <Tooltip
                      placement="right"
                      title={
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
                            {el.tags.map((t, index) => {
                              if (el.tags.length > 5 && index === 4) {
                                return <span key={index}>{t}... </span>;
                              } else if (el.tags.length === index + 1 && index <= 4) {
                                return <span key={index}>{t}</span>;
                              } else if (index <= 4) {
                                return <span key={index}>{t}, </span>;
                              }
                            })}
                          </div>
                        </div>
                      }
                    >
                      <Card
                        className={styles.card}
                        size={"small"}
                        hoverable
                        cover={
                          <img
                            className={styles.anime}
                            alt="anime"
                            src={el.picture}
                          />
                        }
                      >
                        <Meta title={el.title} description={el.type} />
                      </Card>
                    </Tooltip>
                  </div>
                );
              }
            })
          : Array.from(Array(8).keys()).map((el) => {
              return (
                <Card
                  className={styles.card}
                  key={el}
                  size={"small"}
                  hoverable
                  cover={
                    <Skeleton.Avatar
                      active={true}
                      size={142}
                      shape={"square"}
                    />
                  }
                >
                  <Skeleton title={true} active paragraph={{ rows: 1 }} />
                </Card>
              );
            })}
      </Row>
    </div>
  );
};
