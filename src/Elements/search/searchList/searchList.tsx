import { useSearchList } from "bus/search/hooks/useSearchList";
import React, { FC } from "react";
import styled from "styled-components";
import Link from "next/link";
import { ROUTES } from "utils/routes";
import { useDispatch } from "react-redux";
import { setSearchAnime } from "bus/search/actions";

const ListContainer = styled.div`
  position: absolute;
  top: 50px;
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  max-width: 280px;
  max-height: 280px;
  overflow-x: auto;
  /* width */
  ::-webkit-scrollbar {
    border-radius: 4px;
    width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #b6b6b6;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #adadad;
  }
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

export const SearchList: FC = () => {
  const { searchAnimeList } = useSearchList();
  const dispatch = useDispatch();
  const linkClick = () => {
    dispatch(setSearchAnime(null));
  };
  return (
    <>
      {searchAnimeList?.length ? (
        <ListContainer>
          {searchAnimeList?.map((el) => {
            return (
              <div key={el._id.toString()} onClick={() => linkClick()}>
                <Link href={ROUTES.animeById(el?._id)}>
                  <LinkItem href={ROUTES.animeById(el?._id)}>
                    {el?.title}
                  </LinkItem>
                </Link>
              </div>
            );
          })}
        </ListContainer>
      ) : (
        ""
      )}
    </>
  );
};
