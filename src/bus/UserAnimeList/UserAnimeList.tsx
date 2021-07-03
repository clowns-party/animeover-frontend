import { MoreCirclesIcon } from "assets/icons/MoreCirclesIcon";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/rootReducer";
import styled from "styled-components";
import { ROUTES } from "utils/routes";
import Loader from "Elements/loader";
import { EditOutlined, LinkOutlined } from "@ant-design/icons";
import { ellipsis } from "utils/common/ellipsis";
import { userAnimeList } from "./reducer";
import { UserAnimeListModal } from "./Components/UserAnimeListModal";
import { toggleUserAnimeListModal } from "./actions";

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
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
  span {
    font-size: 18px;
    &:hover {
      color: blue;
    }
    margin-left: 10px;
  }
  .links {
    display: flex;
  }
`;

export const UserAnimeList = () => {
  const [animeId, setAnimeId] = useState(null);
  const dispatch = useDispatch();
  const list = useSelector(userAnimeList);
  const loading = useSelector(
    (state: AppState) => state.userAnimeList.isFetching
  );
  const modalVisible = useSelector(
    (state: AppState) => state.userAnimeList.show
  );
  const original = useSelector(
    (state: AppState) => state.userAnimeList._original
  );

  React.useEffect(() => {
    // clear when close modal
    if (!modalVisible) {
      setAnimeId(null);
    }
  }, [modalVisible]);

  if (loading && !animeId) {
    return <Loader loading />;
  }

  if (!loading && !list) {
    return (
      <div>
        <h2>Is empty! Go add anime in your list!</h2>
      </div>
    );
  }

  const openModal = (id: string) => {
    dispatch(toggleUserAnimeListModal(true));
    setAnimeId(id);
  };

  return (
    <>
      {animeId && <UserAnimeListModal withBtn={false} animeId={animeId} />}
      <Table>
        {list?.length &&
          list.map((item) => {
            return (
              <TableItem key={item._id}>
                <img src={item?.picture} alt={item.title} />
                <div className="detail">
                  <h3 title={item.title}>{ellipsis(item.title)}</h3>
                  <h4>
                    {(original && original[item._id]?.status) ?? item.status}
                  </h4>
                  <div className="links">
                    <Link href={ROUTES.animeById(item._id)}>
                      <a href={ROUTES.animeById(item._id)}>
                        <LinkOutlined />
                      </a>
                    </Link>
                    <EditOutlined onClick={() => openModal(item._id)} />
                  </div>
                </div>
              </TableItem>
            );
          })}
      </Table>
    </>
  );
};
