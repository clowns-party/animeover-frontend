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
          focus={focus}
          listFocus={listFocus}
          setListFocus={setListFocus}
        />
      </InputWrap>
    </SearchContainer>
  );
};
