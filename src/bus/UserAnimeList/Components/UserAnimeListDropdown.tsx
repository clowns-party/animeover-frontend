import { BaseDropdown } from "Elements/Base/Dropdown/BaseDropdown";
import React, { FC } from "react";
import styled from "styled-components";
import { selectedAnimeList } from "utils/constants/selectedAnimeList";
import { BaseButton, ButtonType } from "Elements/Base/Button/BaseButton";
import { useCrudUserAnimeList } from "../hooks/useCrudUserAnimeList";
import { UserAnimeListModal } from "./UserAnimeListModal";

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

const NoAuth = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  p {
    margin-top: 5px;
  }
`;

type Props = {
  show?: boolean;
};
export const UserAnimeListDropdown: FC<Props> = ({ show = true }) => {
  const [activeStatus, setActive] = React.useState("-");
  const {
    isFetching,
    loadingUser,
    user,
    inList,
    onChange,
    onRemove,
  } = useCrudUserAnimeList();
  const blockBtns = isFetching;
  React.useEffect(() => {
    if (inList?.status) {
      setActive(inList?.status);
    }
  }, [inList]);

  if (!show) {
    return <></>;
  }
  if (!user && !loadingUser) {
    return (
      <NoAuth>
        <p>Login for adding anime in your list</p>
      </NoAuth>
    );
  }

  return (
    <Container>
      <StyledDropdown
        list={selectedAnimeList}
        active={activeStatus}
        select={onChange}
        disabled={isFetching}
      />
      {inList && (
        <BtnsGroup>
          <UserAnimeListModal disabled={blockBtns}>Edit</UserAnimeListModal>
          <BaseButton
            typeComponent={ButtonType.danger}
            disabled={blockBtns}
            onClick={() => {
              onRemove();
              setActive("-");
            }}
          >
            Remove
          </BaseButton>
        </BtnsGroup>
      )}
    </Container>
  );
};
