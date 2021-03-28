import Image from "next/image";
import styles from "./header.module.scss";
import { Layout, Input, Row, Col, Button, Divider } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Link from "next/link";

export const HeaderAnime = () => {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  return (
    <>
      <Row className={styles.header_container}>
        <Col flex="40px" className={styles.container_list_anime_mobile}>
          <div className={styles.hamburger}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Col>
        <Col flex="150px">
          <div className={`${styles.logo_container} ${styles.item}`}>
            <div className={styles.logo}>
              <Image
                src="/hands.svg"
                layout="fixed"
                alt="logo"
                width={26}
                height={26}
              />
            </div>
            <p className={`${styles.name} ${styles.item}`}>Clowns Anime</p>
          </div>
        </Col>
        <Col flex="150px" className={styles.container_list_anime}>
          <div className={`${styles.list_anime} ${styles.item}`}>
            <div>
              <Image
                src="/home.svg"
                alt="home"
                layout="fixed"
                width={13}
                height={13}
              />
            </div>
            Главная
            <div className={styles.arrow}>
              <Image
                src="/arrow.svg"
                alt="arrow"
                layout="fixed"
                width={10}
                height={10}
              />
            </div>
          </div>
        </Col>
        <Col flex="auto" className={styles.search_container}>
          <div className={`${styles.item} ${styles.search}`}>
            <Search
              placeholder="Search Anime"
              onSearch={onSearch}
              enterButton
            />
          </div>
        </Col>
        <Col flex="auto" className={styles.search_container_mobile}>
          <Divider orientation="right" style={{ margin: "0"}}>
            <Button type="primary" icon={<SearchOutlined />} />
          </Divider>
        </Col>
        <Col xs={3} sm={2} md={2} lg={2} xl={2} xxl={1} flex="auto">
          <Link href="/signIn">
            <div className={styles.login}>Вход</div>
          </Link>
        </Col>
      </Row>
    </>
  );
};
