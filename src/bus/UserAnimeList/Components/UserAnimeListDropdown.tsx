import { BaseDropdown } from "Elements/Base/Dropdown/BaseDropdown";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { service } from "Services";
import styled from "styled-components";
import { selectedAnimeList } from "utils/constants/selectedAnimeList";
import { BaseButton, ButtonType } from "Elements/Base/Button/BaseButton";
import { useAuth } from "bus/auth/hooks/useAuth";
import { changeAnimeUserList, getUserAnimeList } from "../actions";
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
type Props = {
  show?: boolean;
};
export const UserAnimeListDropdown: FC<Props> = ({ show = true }) => {
  const { data, isFetching: loadingUser } = useAuth();
  const user = data?.user;
  const dispatch = useDispatch();
  const router = useRouter();
  React.useEffect(() => {
    if (user) {
      dispatch(getUserAnimeList());
    }
  }, [user]);

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

  const onChange = async (status: UserAnimeListStatuses) => {
    setstate((prev) => ({ ...prev, loading: true }));
    try {
      const form = {
        animeId,
        status,
      };
      const result = await service.userService.animeListChange(form);
      dispatch(
        changeAnimeUserList({
          response: result.data,
          changed: form,
        })
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setstate((prev) => ({ ...prev, loading: false }));
    }
  };

  const blockBtns = state.loading || isFetching;

  if (!show) {
    return <></>;
  }
  if (!data && !loadingUser) {
    return <div>Login for adding anime in your list</div>;
  }

  return (
    <Container>
      <StyledDropdown
        list={selectedAnimeList}
        active={active}
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
