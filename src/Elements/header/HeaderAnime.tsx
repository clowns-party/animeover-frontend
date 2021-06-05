import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { Input, Row, Col, Button, Divider } from "antd";
import Link from "next/link";
import {
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styles from "./header.module.scss";
import { logout } from "../../bus/auth/actions";
import { useAuth } from "../../bus/auth/hooks/useAuth";

export const HeaderAnime: FC = () => {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  const { data, isFetching, error } = useAuth();

  const [count, setCount] = useState(false);

  const menuStyle = count ? styles.deleteMenu : "";

  const dispatch = useDispatch();

  return (
    <>
      <Row className={styles.header_container}>
        <Col flex="40px" className={styles.container_list_anime_mobile}>
          <Button
            type="primary"
            onClick={() => {
              setCount(!count);
            }}
            style={{ marginLeft: 6 }}
          >
            {count ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </Button>
        </Col>
        <Col flex="150px">
          <Link href="/">
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
          </Link>
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
          <Divider orientation="right" style={{ margin: "0" }}>
            <Button type="primary" icon={<SearchOutlined />} />
          </Divider>
        </Col>
        {data?.user ? (
          <Col
            xs={7}
            sm={7}
            md={6}
            lg={5}
            xl={4}
            xxl={3}
            flex="auto"
            className={styles.user_info_mobile}
          >
            <div className={styles.user_container}>
              <Link href="/profile">
                <div className={styles.user}>{data?.user.email}</div>
              </Link>
              <Button
                type="primary"
                onClick={() => {
                  dispatch(logout());
                }}
                icon={<LoginOutlined />}
              >
                <span className={styles.button_desktop}>Выход</span>
              </Button>
            </div>
          </Col>
        ) : (
          <Col
            xs={5}
            sm={5}
            md={4}
            lg={3}
            xl={3}
            xxl={2}
            flex="auto"
            className={styles.user_info_mobile}
          >
            <div className={styles.login_desktop}>
              <Link href="/signIn">
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<LoginOutlined />}
                >
                  Войти
                </Button>
              </Link>
            </div>
          </Col>
        )}
      </Row>

      <div className={`${styles.menu_mobile} ${menuStyle}`}>
        {data?.user ? (
          <div className={styles.user_container_hamburger}>
            <div className={styles.menu_mobile_item}>
              <div className={styles.user}>{data?.user.email}</div>
            </div>
            <div className={styles.menu_mobile_item}>
              <Button
                type="primary"
                onClick={() => {
                  dispatch(logout());
                }}
                icon={<LoginOutlined />}
              >
                <span>Выход</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.menu_mobile_item}>
            <Link href="/signIn">
              <Button type="primary" htmlType="submit" icon={<LoginOutlined />}>
                Войти
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
