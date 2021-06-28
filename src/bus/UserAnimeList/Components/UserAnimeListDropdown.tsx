import { BaseDropdown } from "Elements/Base/Dropdown/BaseDropdown";
import { useRouter } from "next/router";
import React from "react";
import { service } from "Services";
import styled from "styled-components";
import { RawAnimeListType, UserAnimeListStatuses } from "../types";

const StyledDropdown = styled(BaseDropdown)`
  width: 230px;
  margin-top: 20px;
  margin-bottom: 70px;
`;

export const UserAnimeListDropdown = () => {
  const router = useRouter();
  const animeId = router.query.id.toString();
  const [userList, setuserList] = React.useState<RawAnimeListType>(null);
  React.useEffect(() => {
    service.userService.animeList().then((res) => {
      setuserList(res.data);
    });
  }, []);
  const inList = userList && userList[animeId];

  const [state, setstate] = React.useState({
    loading: false,
  });
  const [list, setlist] = React.useState<UserAnimeListStatuses[]>([
    "viewed",
    "abandoned",
    "postponed",
    "planned",
    "reviewing",
    "look",
  ]);
  const [acitve, setActive] = React.useState(list[0]);

  React.useEffect(() => {
    if (inList?.status) {
      setActive(inList?.status);
    }
  }, [inList]);

  const onChange = async (status: UserAnimeListStatuses) => {
    setstate((prev) => ({ ...prev, loading: true }));
    try {
      const form = {
        animeId,
        status,
      };
      await service.userService.animeListChange(form);
      setActive(status);
    } catch (error) {
      alert(error.message);
    } finally {
      setstate((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <>
      <StyledDropdown
        list={list}
        active={acitve}
        select={onChange}
        disabled={state.loading}
      />
    </>
  );
};
