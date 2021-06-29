import { notification } from "antd";
import { BaseDropdown } from "Elements/Base/Dropdown/BaseDropdown";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { service } from "Services";
import styled from "styled-components";
import { selectedAnimeList } from "utils/constants/selectedAnimeList";
import { BaseButton, ButtonType } from "Elements/Base/Button/BaseButton";
import { getUserAnimeList } from "../actions";
import { userAnimeListState } from "../reducer";
import { UserAnimeListStatuses } from "../types";

const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 70px;
  width: 230px;
`;

const StyledDropdown = styled(BaseDropdown)`
  width: 230px;
`;

const BtnsGroup = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const UserAnimeListDropdown = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  React.useEffect(() => {
    dispatch(getUserAnimeList());
  }, []);

  const { _original, isFetching } = useSelector(userAnimeListState);
  const selected = _original;
  const animeId = router.query.id.toString();
  const inList = selected && selected[animeId];
  const [state, setstate] = React.useState({
    loading: false,
  });
  const [active, setActive] = React.useState("-");

  React.useEffect(() => {
    if (inList?.status) {
      setActive(inList?.status);
    }
  }, [inList]);

  const openNotification = () => {
    if (!inList) {
      const key = `open${Date.now()}`;
      const btn = (
        <BaseButton onClick={() => notification.close(key)}>Edit</BaseButton>
      );
      notification.open({
        message: "You added anime to your list!",
        description:
          "You can add a rating or write your own review about this anime.",
        btn,
        key,
        duration: 8,
      });
    }
  };

  const onChange = async (status: UserAnimeListStatuses) => {
    setstate((prev) => ({ ...prev, loading: true }));
    try {
      const form = {
        animeId,
        status,
      };
      await service.userService.animeListChange(form);
      setActive(status);
      openNotification();
    } catch (error) {
      alert(error.message);
    } finally {
      setstate((prev) => ({ ...prev, loading: false }));
    }
  };

  const blockBtns = state.loading || isFetching;

  return (
    <Container>
      <StyledDropdown
        list={selectedAnimeList}
        active={isFetching ? "-" : active}
        select={onChange}
        disabled={state.loading || isFetching}
      />
      {inList && (
        <BtnsGroup>
          <BaseButton disabled={blockBtns}>Edit</BaseButton>
          <BaseButton typeComponent={ButtonType.danger} disabled={blockBtns}>
            Remove
          </BaseButton>
        </BtnsGroup>
      )}
    </Container>
  );
};
