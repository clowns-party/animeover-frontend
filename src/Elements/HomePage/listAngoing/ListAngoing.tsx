import { Card, Col, Row } from "antd";
import Image from "next/image";
import React, { FC } from "react";
import { useAnimelist } from "../../../bus/anime/hooks/useAnimeList";
import styles from "./listAngoing.module.scss";

export const ListAgnoing: FC = () => {
  const { anime, isFetching, error } = useAnimelist();
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
      <Row className={styles.angoing_container}>
        {anime?.length &&
          anime.map((el) => {
            return (
              <div>
                <Card
                  className={styles.card}
                  key={el._id}
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
              </div>
            );
          })}
      </Row>
    </div>
  );
};
