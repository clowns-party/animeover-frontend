import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "redux/rootReducer";

import styled from "styled-components";
import { getFiltersByRoute } from "utils/anime/getFiltersByRoute";
import { routeFilters } from "utils/anime/routeFilters";
import { Seasons } from "utils/constants/seasons";
import { AnimeTags } from "utils/constants/tags";
import { AnimeTagsType, SeasonsType } from "./types";

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 50px;
  overflow: hidden;
  display: none;
  @media (max-width: 576px) {
    display: block;
  }
`;

const SuggestionRow = styled.div`
  display: flex;
  width: auto;
  max-width: 100%;
  overflow-x: scroll;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const SuggestionItem = styled.a<{ active: boolean }>`
  height: 32px;
  padding: 6px 16px;
  border-radius: 16px;
  background-color: ${(props) => (props.active ? "#7e7e7e" : "#414042")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex: 1 0 auto;
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
  transition: 0.3s all ease;
  &:hover {
    opacity: 0.7;
    color: white;
  }
  text-decoration: none;
  text-decoration-color: none;
`;

export const Suggestions = () => {
  const { query } = useRouter();
  const filters = useSelector((state: AppState) => state.anime.filters);
  const seasonsList = Seasons.filter((season) => season !== "-");
  const tags = AnimeTags.filter((season) => season !== "-");

  const queryFilters = getFiltersByRoute(query);
  const activeFilters = filters || queryFilters;

  const seasonIsActive = (season: SeasonsType) => {
    if (activeFilters && activeFilters.season) {
      return season === activeFilters.season;
    }
    return false;
  };
  const tagActive = (tag: AnimeTagsType) => {
    if (activeFilters && activeFilters.tag) {
      return tag === activeFilters.tag;
    }
    return false;
  };
  return (
    <Container>
      <SuggestionRow
        style={{
          maxWidth: "470px",
        }}
      >
        {seasonsList.map((season, index) => {
          return (
            <Link
              href={routeFilters(season, activeFilters?.tag)}
              key={`${index.toString()}-${season}`}
            >
              <SuggestionItem
                active={seasonIsActive(season)}
                href={routeFilters(season, activeFilters?.tag)}
              >
                {season}
              </SuggestionItem>
            </Link>
          );
        })}
      </SuggestionRow>
      <SuggestionRow>
        {tags.map((tag, index) => {
          return (
            <Link
              href={routeFilters(activeFilters?.season, tag)}
              key={`${index.toString()}-${tag}`}
            >
              <SuggestionItem
                active={tagActive(tag)}
                href={routeFilters(activeFilters?.season, tag)}
              >
                {tag}
              </SuggestionItem>
            </Link>
          );
        })}
      </SuggestionRow>
    </Container>
  );
};
