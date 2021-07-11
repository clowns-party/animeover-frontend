import { useSearchList } from "bus/search/hooks/useSearchList";
import React, { FC } from "react";
import styled from "styled-components";
import Link from "next/link";
import { ROUTES } from "utils/routes";
import { useDispatch } from "react-redux";
import { setSearchAnime } from "bus/search/actions";
import { ellipsis } from "../../../utils/common/ellipsis";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  position: absolute;
  top: 50px;
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  max-width: 280px;
  min-width: 280px;
  max-height: 280px;
  overflow-x: auto;
  -webkit-box-shadow: 0px 7px 30px 0px rgba(50, 50, 50, 0.22);
  -moz-box-shadow: 0px 7px 30px 0px rgba(50, 50, 50, 0.22);
  box-shadow: 0px 7px 30px 0px rgba(50, 50, 50, 0.22);
  /* width */
  ::-webkit-scrollbar {
    border-radius: 4px;
    width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #ffffff;
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
  @media screen and (max-width: 768px) {
    max-width: 100%;
    min-width: 100%;
    min-height: 100%;
    height: 100%;
    max-height: 70vh;
    top: 20px;
    position: relative;
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
  /* max-width: 170px; */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  /* max-height: 22px; */
  min-height: 22px;
  /* min-width: 100%; */
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    font-size: 16px;
    min-height: 40px;
    border-bottom: 1px solid #c7c0c0;
    &:last-child {
      border-bottom: none;
    }
  }
`;

const EmptyList = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
`;

export const SearchList: FC<{
  focus: boolean;
  listFocus: boolean;
  setListFocus: React.Dispatch<React.SetStateAction<boolean>>;
  mobileCLose?: () => void;
}> = ({ focus, listFocus, setListFocus, mobileCLose }) => {
  const { searchAnimeList } = useSearchList();
  const dispatch = useDispatch();
  const linkClick = () => {
    mobileCLose();
    dispatch(setSearchAnime(null));
  };
  return (
    <div
      onMouseEnter={() => setListFocus(true)}
      onMouseLeave={() => setListFocus(false)}
    >
      {(focus || listFocus) && (
        <>
          {searchAnimeList?.length ? (
            <ListContainer>
              {searchAnimeList?.map((el) => {
                return (
                  <Link
                    href={ROUTES.animeById(el?._id)}
                    key={el._id.toString()}
                  >
                    <LinkItem
                      href={ROUTES.animeById(el?._id)}
                      onClick={() => linkClick()}
                      title={el?.title}
                    >
                      {ellipsis(el?.title, 25)}
                    </LinkItem>
                  </Link>
                );
              })}
            </ListContainer>
          ) : (
            <>
              {searchAnimeList?.length === 0 && (
                <ListContainer>
                  <EmptyList> Ничего не найдено</EmptyList>
                </ListContainer>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
