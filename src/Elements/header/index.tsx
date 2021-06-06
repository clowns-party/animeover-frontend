import React, { FC, useState } from "react";
import Link from "next/link";
import { BaseButton } from "Elements/Base/Button/BaseButton";
import { DesktopLogo } from "assets/icons/DesktopLogo";
import { BaseInput, InputType } from "Elements/Base/Input/BaseInput";
import styled from "styled-components";
import { useMedia } from "react-use";
import { SignInForm } from "Elements/signInForm/signInForm";
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
                <SignInForm />
              )}
            </div>
          </HeaderStyled>
          <Clearfix />
        </>
      )}
    </>
  );
};
