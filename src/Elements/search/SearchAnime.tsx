import React, { FC, useCallback, useState } from "react";
import { BaseInput, InputType } from "Elements/Base/Input/BaseInput";
import { debounce } from "lodash";
import styled from "styled-components";
import { searchAnimeAction } from "bus/search/actions";
import { useDispatch } from "react-redux";
import { useSearchList } from "bus/search/hooks/useSearchList";
import { SearchList } from "./searchList/searchList";

const SearchContainer = styled.div`
  position: relative;
  @media screen and (max-width: 768px) {
    min-width: 90%;
    margin-top: 20px;
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
  @media screen and (max-width: 768px) {
    margin-right: 0;
    input {
      width: 100%;
    }
  }
`;

export const SearchAnime: FC<{
  mobileCLose?: () => void;
  showAlways?: boolean;
}> = ({ mobileCLose, showAlways }) => {
  const dispatch = useDispatch();
  const { searchAnimeList } = useSearchList();
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState("");
  const [listFocus, setListFocus] = useState(false);
  const onSearch = useCallback(
    debounce((event) => {
      dispatch(searchAnimeAction(event.target.value));
    }, 500),
    []
  );
  const searchFocused = () => {
    setFocus(true);
    if (searchAnimeList === null && text) {
      dispatch(searchAnimeAction(text));
    }
  };
  //
  return (
    <SearchContainer>
      <InputWrap onBlur={() => setFocus(false)} onFocus={() => searchFocused()}>
        <BaseInput
          placeholder="SEARCH"
          value={text}
          typeComponent={InputType.search}
          onChange={(event) => {
            onSearch(event);
            setText(event.target.value);
          }}
          className="input"
        />
        <SearchList
          showAlways={showAlways}
          focus={focus}
          listFocus={listFocus}
          setListFocus={setListFocus}
          mobileCLose={mobileCLose}
        />
      </InputWrap>
    </SearchContainer>
  );
};
