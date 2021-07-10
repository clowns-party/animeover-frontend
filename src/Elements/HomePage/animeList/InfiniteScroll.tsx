import { changePage, fetchWithFilters, setErrorAnime } from "bus/anime/actions";
import { AnimeList, FiltersPayload } from "bus/anime/types";
import { AnimeTagsType, SeasonsType } from "bus/filters/types";
import Empties from "Elements/empties";
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
import { getFiltersByRoute } from "utils/anime/getFiltersByRoute";
import { removeDuplicateObjectFromArray } from "utils/common/removeDuplicateObjectFromArray";

import { AnimeCards } from "./AnimeCards";

export type StateInfiniteScroll = {
  animeList: AnimeList | [];
  page: number;
  prevY: number;
  type?: "default" | "filtered";
  filters?: FiltersPayload;
  end: boolean;
  isEmpty: boolean;
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
      isEmpty: false,
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
      setTimeout(() => {
        this.fetchAnime(1);
      }, 0);
    }
    if (
      isEqual(prevProps.router.query, this.props.router.query) &&
      this.props.error
    ) {
      this.pauseFetch();
    }
  }

  componentWillUnmount() {
    this.clear();
  }

  handleObserver(entities: IntersectionObserverEntry[]) {
    const { error, isFetching } = this.props;
    const { y } = entities[0].boundingClientRect;
    if (!isFetching && !this.state.end && !error) {
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
        const queryFilters = {
          ...getFiltersByRoute(query),
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
    const { error } = this.props;

    if (this.props.animeList?.length && !error) {
      const merged = removeDuplicateObjectFromArray(
        [...animeList, ...this.props.animeList],
        "_id"
      );
      this.setState({
        animeList: merged,
      });
    } else {
      this.pauseFetch();
    }
  }

  pauseFetch() {
    const { error } = this.props;
    const { animeList } = this.state;

    if (!animeList?.length || error) {
      this.setState({
        isEmpty: true,
      });
    }
    this.setState({
      end: true,
    });
  }

  clear() {
    this.props.setErrorAnime(null);
    this.setState({
      animeList: [],
      end: false,
      page: 0,
      prevY: 0,
      isEmpty: false,
    });
  }

  render() {
    const { animeList, end, filters, isEmpty } = this.state;
    const { isFetching, error } = this.props;
    const loadingCSS = {
      height: "15px",
      margin: "15px",
    };
    const showEmpties = isEmpty && !isFetching;
    const listEnd = end && !error;

    return (
      <>
        <AnimeCards animeList={animeList} loading={isFetching}>
          <>
            {showEmpties && <Empties />}
            {listEnd && <Empties.End />}
          </>
        </AnimeCards>

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

function mapStateToProps(state: AppState, props: ComponentProps) {
  const {
    animeList,
    filtered,
    filters,
    isFetching,
    currentPage,
    count,
    pageLimit,
    error,
  } = state.anime;
  return {
    animeList: props.type === "default" ? animeList : filtered || [],
    filtered,
    filters,
    isFetching,
    currentPage,
    count,
    pageLimit,
    error,
  };
}
const connector = connect(mapStateToProps, {
  fetchWithFilters,
  changePage,
  setErrorAnime,
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
