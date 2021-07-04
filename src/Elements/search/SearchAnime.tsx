import React, { FC, useCallback } from "react";
import { BaseInput, InputType } from "Elements/Base/Input/BaseInput";
import { debounce } from "lodash";
import styled from "styled-components";
import { searchAnimeAction } from "bus/search/actions";
import { useDispatch } from "react-redux";
import { SearchList } from "./searchList/searchList";

const SearchContainer = styled.div`
  position: relative;
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

export const SearchAnime: FC = () => {
  const dispatch = useDispatch();
  const onSearch = useCallback(
    debounce((event) => dispatch(searchAnimeAction(event.target.value)), 500),
    []
  );
  //
  return (
    <SearchContainer>
      <InputWrap>
        <BaseInput
          placeholder="SEARCH"
          typeComponent={InputType.search}
          onChange={onSearch}
          className="input"
        />
      </InputWrap>
      <SearchList />
    </SearchContainer>
  );
};
