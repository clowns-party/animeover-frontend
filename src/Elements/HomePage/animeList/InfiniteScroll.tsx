import { changePage, fetchWithFilters } from "bus/anime/actions";
import { AnimeList, FiltersPayload } from "bus/anime/types";
import { AnimeTagsType, SeasonsType } from "bus/filters/types";
import { isEqual } from "lodash";
import {
  ExcludeRouterProps,
  WithRouterProps,
} from "next/dist/client/with-router";
import { withRouter } from "next/router";
import React from "react";
import { connect, ConnectedComponent, ConnectedProps } from "react-redux";
import { compose } from "redux";
import { AppState } from "redux/rootReducer";
import { removeDuplicateObjectFromArray } from "utils/common/removeDuplicateObjectFromArray";

import { AnimeCards } from "./AnimeCards";

export type StateInfiniteScroll = {
  animeList: AnimeList | [];
  page: number;
  prevY: number;
  type?: "default" | "filtered";
  filters?: FiltersPayload;
  end: boolean;
};
interface ComponentProps {
  startPage?: number;
  type?: StateInfiniteScroll["type"];
}
interface Props extends PropsFromRedux, ComponentProps, WithRouterProps {}
class InfiniteScroll extends React.PureComponent<Props, StateInfiniteScroll> {
  observer: IntersectionObserver;
  loadingRef: HTMLDivElement;
  constructor(props: Props) {
    super(props);
    const { animeList, type, filters, startPage } = this.props;
    this.state = {
      animeList: animeList || [],
      page: startPage || 1,
      prevY: 0,
      type: type || "default",
      filters,
      end: false,
    };
  }

  componentDidMount() {
    const { page } = this.state;
    this.fetchAnime(page);
    const options = {
      root: null, // Page as root
      rootMargin: "0px",
      threshold: 1.0,
    };
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(prevProps.animeList, this.props.animeList)) {
      this.updateList();
    }

    if (!isEqual(prevProps.router.query, this.props.router.query)) {
      this.clear();
    }
  }

  handleObserver(
    entities: IntersectionObserverEntry[],
    _observer: IntersectionObserver
  ) {
    const { y } = entities[0].boundingClientRect;
    if (!this.props.isFetching && !this.state.end) {
      const { prevY, page } = this.state;
      if (prevY > y) {
        const curPage = page + 1;
        this.fetchAnime(curPage);
      }
    }

    this.setState({ prevY: y });
  }

  fetchAnime(page: number) {
    if (!this.state.end) {
      if (this.state.type === "default") {
        this.props.changePage({
          limit: this.props.pageLimit,
          page,
        });
        this.setState({ page });
      } else {
        const { query } = this.props.router;
        const season = query?.season
          ? (query?.season.toString().toUpperCase() as SeasonsType)
          : "SUMMER";
        const tag = query?.tag as AnimeTagsType;
        const queryFilters = {
          season,
          tag,
          page,
        };
        this.setState({ page });

        this.setState({ filters: queryFilters });
        this.props.fetchWithFilters(queryFilters);
      }
    }
  }

  updateList() {
    const { animeList } = this.state;

    if (this.props.animeList?.length) {
      const merged = removeDuplicateObjectFromArray(
        [...animeList, ...this.props.animeList],
        "_id"
      );
      this.setState({
        animeList: merged,
      });
    } else {
      this.setState({
        end: true,
      });
    }
  }

  clear() {
    this.setState({
      animeList: [],
      end: false,
      page: 0,
    });
  }

  render() {
    const { animeList, end, filters } = this.state;
    const { isFetching } = this.props;
    const loadingCSS = {
      height: "15px",
      margin: "15px",
    };

    return (
      <>
        <AnimeCards animeList={animeList} loading={isFetching} />
        {end && <h2>This is end!</h2>}
        <div
          ref={(loadingRef) => {
            this.loadingRef = loadingRef;
          }}
          style={{
            ...loadingCSS,
            height: "0px",
            width: "0px",
          }}
        >
          {" "}
        </div>
      </>
    );
  }
}

function mapStateToProps(state: AppState, props: any) {
  const {
    animeList,
    filtered,
    filters,
    isFetching,
    currentPage,
    count,
    pageLimit,
  } = state.anime;
  return {
    animeList: props.type === "default" ? animeList : filtered || [],
    filtered,
    filters,
    isFetching,
    currentPage,
    count,
    pageLimit,
  };
}
const connector = connect(mapStateToProps, {
  fetchWithFilters,
  changePage,
});

type PropsFromRedux = ConnectedProps<typeof connector>;
const enhance = compose<
  React.ComponentType<ExcludeRouterProps<WithRouterProps>> &
    ConnectedComponent<typeof InfiniteScroll, ComponentProps>
>(
  withRouter,
  connector
)(InfiniteScroll);

export default enhance;
