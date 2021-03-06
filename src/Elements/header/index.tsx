import React, { FC } from "react";
import Link from "next/link";
import { DesktopLogo } from "assets/icons/DesktopLogo";
import styled from "styled-components";
import { AuthForm } from "Elements/forms/auth";
import { HeaderMobile } from "Elements/header/mobile";
import { ROUTES } from "utils/routes";
import { zIndexLayout } from "utils/constants/zIndexLayout";
import imgOnLoad from "utils/common/imgOnLoad";
import { useRouter } from "next/router";
import { useAuth } from "../../bus/auth/hooks/useAuth";
import { SearchAnime } from "../search/SearchAnime";

const Mobile = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
const HeaderStyled = styled.div`
  width: 100%;
  display: flex;
  background: white;
  height: 60px;
  align-items: center;
  padding: 1rem;
  position: fixed;
  z-index: ${zIndexLayout.LOW_LEVEL};
  .logo {
    margin-right: 60px;
    cursor: pointer;
  }
  .header-end {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    img {
      height: 40px;
      width: 40px;
      max-width: 40px;
      max-height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Links = styled.div`
  display: flex;
`;
const LinkItem = styled.a<{ active: boolean }>`
  cursor: pointer;
  margin-right: 30px;
  font-style: normal;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
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
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Header: FC = () => {
  const router = useRouter();
  const { data, isFetching, error } = useAuth();
  const auth = data?.user;
  const imgUri = imgOnLoad(auth?.photoURL, "/user.svg");

  const links = [
    {
      name: "Ongoing",
      link: ROUTES.ongoing,
      active: router.pathname === "/ongoing",
    },
    {
      name: "Anime",
      link: ROUTES.anime,
      active: router.pathname.includes("anime"),
    },
  ];

  return (
    <>
      <HeaderStyled>
        <Link href={ROUTES.main}>
          <div className="logo">
            <DesktopLogo />
          </div>
        </Link>

        <Links>
          {links.map((link, index) => (
            <Link href={link.link} key={index.toString()}>
              <LinkItem href={link.link} active={link.active}>
                {link.name}
              </LinkItem>
            </Link>
          ))}
        </Links>
        <div className="header-end">
          <SearchAnime />
          {auth ? (
            <Link href="/profile">
              <a href="/profile">
                <img src={imgUri} alt="user" />
              </a>
            </Link>
          ) : (
            <AuthForm />
          )}
        </div>
      </HeaderStyled>
      <Clearfix />
      <Mobile>
        <HeaderMobile />
      </Mobile>
    </>
  );
};
