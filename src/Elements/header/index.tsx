import React, { FC } from "react";
import Link from "next/link";
import { BaseButton } from "Elements/Base/Button/BaseButton";
import { DesktopLogo } from "assets/icons/DesktopLogo";
import { BaseInput, InputType } from "Elements/Base/Input/BaseInput";
import styled from "styled-components";
import { useMedia } from "react-use";
import { useAuth } from "../../bus/auth/hooks/useAuth";

const HeaderStyled = styled.div`
  width: 100%;
  display: flex;
  background: white;
  height: 60px;
  align-items: center;
  padding: 1rem;
  position: fixed;
  z-index: 99;
  .logo {
    margin-right: 60px;
  }
  .header-end {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const InputWrap = styled.div`
  margin-right: 156px;
  @media screen and (max-width: 992px) {
    input {
      width: 150px;
    }
    margin-right: 30px;
  }
`;

const Links = styled.div`
  display: flex;
`;
const LinkItem = styled.a`
  cursor: pointer;
  margin-right: 30px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  transition: 0.3s all ease;
  &:hover {
    opacity: 0.7;
  }
`;

const Clearfix = styled.div`
  height: 60px;
  margin-bottom: 30px;
  position: relative;
`;

export const Header: FC = () => {
  const isMobile = useMedia("(max-width: 768px)");
  const onSearch = (event) => console.log(event.target.value);
  const { data, isFetching, error } = useAuth();
  const auth = data?.user;

  const links = [
    {
      name: "Ongoing",
      link: "/",
    },
    {
      name: "Anime",
      link: "/",
    },
  ];

  return (
    <>
      {!isMobile && (
        <>
          <HeaderStyled>
            <div className="logo">
              <DesktopLogo />
            </div>

            <Links>
              {links.map((link, index) => (
                <Link href={link.link} key={index.toString()}>
                  <LinkItem href={link.link}>{link.name}</LinkItem>
                </Link>
              ))}
            </Links>
            <div className="header-end">
              <InputWrap>
                <BaseInput
                  placeholder="SEARCH"
                  typeComponent={InputType.search}
                  onChange={onSearch}
                  className="input"
                />
              </InputWrap>
              {auth ? (
                <Link href="/profile">
                  <a href="/profile">
                    <img src={auth?.photoURL} alt="user" />
                  </a>
                </Link>
              ) : (
                <Link href="/signIn">
                  <BaseButton>LOG IN</BaseButton>
                </Link>
              )}
            </div>
          </HeaderStyled>
          <Clearfix />
        </>
      )}
    </>
    // <d>
    //   <Row className={styles.header_container}>
    //     <Col flex="40px" className={styles.container_list_anime_mobile}>
    //       <Button
    //         type="primary"
    //         onClick={() => {
    //           setCount(!count);
    //         }}
    //         style={{ marginLeft: 6 }}
    //       >
    //         {count ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
    //       </Button>
    //     </Col>
    //     <Col flex="150px">
    //       <Link href="/">
    //         <div className={`${styles.logo_container} ${styles.item}`}>
    //           <div className={styles.logo}>
    //             <Image
    //               src="/hands.svg"
    //               layout="fixed"
    //               alt="logo"
    //               width={26}
    //               height={26}
    //             />
    //           </div>
    //           <p className={`${styles.name} ${styles.item}`}>Clowns Anime</p>
    //         </div>
    //       </Link>
    //     </Col>
    //     <Col flex="auto" className={styles.search_container}>
    //       <div className={`${styles.item} ${styles.search}`}>
    //         <Search
    //           placeholder="Search Anime"
    //           onSearch={onSearch}
    //           enterButton
    //         />
    //       </div>
    //     </Col>
    //     <Col flex="auto" className={styles.search_container_mobile}>
    //       <Divider orientation="right" style={{ margin: "0" }}>
    //         <Button type="primary" icon={<SearchOutlined />} />
    //       </Divider>
    //     </Col>
    //     {data?.user ? (
    //       <Col
    //         xs={7}
    //         sm={7}
    //         md={6}
    //         lg={5}
    //         xl={4}
    //         xxl={3}
    //         flex="auto"
    //         className={styles.user_info_mobile}
    //       >
    //         <div className={styles.user_container}>
    //           <Link href="/profile">
    //             <div className={styles.user}>{data?.user.email}</div>
    //           </Link>
    //           <Button
    //             type="primary"
    //             onClick={() => {
    //               dispatch(logout());
    //             }}
    //             icon={<LoginOutlined />}
    //           >
    //             <span className={styles.button_desktop}>Выход</span>
    //           </Button>
    //         </div>
    //       </Col>
    //     ) : (
    //       <Col
    //         xs={5}
    //         sm={5}
    //         md={4}
    //         lg={3}
    //         xl={3}
    //         xxl={2}
    //         flex="auto"
    //         className={styles.user_info_mobile}
    //       >
    //         <div className={styles.login_desktop}>
    //           <Link href="/signIn">
    //             <BaseButton>Войти</BaseButton>
    //           </Link>
    //         </div>
    //       </Col>
    //     )}
    //   </Row>

    //   <div className={`${styles.menu_mobile} ${menuStyle}`}>
    //     {data?.user ? (
    //       <div className={styles.user_container_hamburger}>
    //         <div className={styles.menu_mobile_item}>
    //           <div className={styles.user}>{data?.user.email}</div>
    //         </div>
    //         <div className={styles.menu_mobile_item}>
    //           <Button
    //             type="primary"
    //             onClick={() => {
    //               dispatch(logout());
    //             }}
    //             icon={<LoginOutlined />}
    //           >
    //             <span>Выход</span>
    //           </Button>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className={styles.menu_mobile_item}>
    //         <Link href="/signIn">
    //           <BaseButton>Войти</BaseButton>
    //         </Link>
    //       </div>
    //     )}
    //   </div>
    // </d>
  );
};
