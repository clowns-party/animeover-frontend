import { MoreCirclesIcon } from "assets/icons/MoreCirclesIcon";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "redux/rootReducer";
import styled from "styled-components";
import { ROUTES } from "utils/routes";
import Loader from "Elements/loader";
import { userAnimeList } from "./reducer";

const Table = styled.div``;

const TableItem = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  padding-top: 5px;
  width: 100%;
  border-top: 1px solid #e8ebee;
  transition: 0.3s all ease;
  &:hover {
    border-top: 1px solid black;
  }
  cursor: pointer;

  a,
  .detail {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
  h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #313030;
    max-width: 80px;
  }
  h4 {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #4a4a4a;
  }
  img {
    min-width: 42px;
    min-height: 41px;
    max-width: 42px;
    max-height: 41px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 34px;
  }
`;

export const UserAnimeList = () => {
  const list = useSelector(userAnimeList);
  const loading = useSelector(
    (state: AppState) => state.userAnimeList.isFetching
  );
  if (loading) {
    return <Loader loading />;
  }

  if (!loading && !list) {
    return (
      <div>
        <h2>Is empty! Go add anime in your list!</h2>
      </div>
    );
  }

  return (
    <Table>
      {list.map((item) => {
        return (
          <TableItem key={item._id}>
            <Link href={ROUTES.animeById(item._id)}>
              <a href={ROUTES.animeById(item._id)}>
                <img src={item?.picture} alt={item.title} />
                <div className="detail">
                  <h3>{item.title}</h3>
                  <h4>{item.status}</h4>
                  <MoreCirclesIcon />
                </div>
              </a>
            </Link>
          </TableItem>
        );
      })}
    </Table>
  );
};
