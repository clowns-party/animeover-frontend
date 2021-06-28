import { LoadingOutlined } from "@ant-design/icons";
import { AnimeList } from "bus/anime/types";
import Loader from "Elements/loader";
import React from "react";
import { service } from "Services";
import { AnimeCards } from "./AnimeCards";
import styles from "./animeList.module.scss";

type State = {
  animeList: AnimeList | [];
  page: number;
  loading: boolean;
  prevY: number;
};
type Props = {
  startPage?: number;
};
export class InfiniteScroll extends React.Component<Props, State> {
  observer: IntersectionObserver;
  loadingRef: HTMLDivElement;
  constructor(props: Props) {
    super(props);
    const { startPage } = this.props;
    this.state = {
      animeList: [],
      page: startPage || 1,
      loading: false,
      prevY: 0,
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

  handleObserver(
    entities: IntersectionObserverEntry[],
    _observer: IntersectionObserver
  ) {
    const { prevY, page } = this.state;
    const { y } = entities[0].boundingClientRect;
    if (prevY > y) {
      const curPage = page + 1;
      this.fetchAnime(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }

  fetchAnime(page) {
    const { animeList } = this.state;
    this.setState({ loading: true });
    service.animeService.animeList(20, page).then((res) => {
      this.setState({
        animeList: [...animeList, ...res.data.animeList],
      });
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading, animeList } = this.state;
    const loadingCSS = {
      height: "15px",
      margin: "15px",
    };

    return (
      <div className="container">
        <div
          style={{ minHeight: "800px" }}
          className={styles.anime_list_container}
        >
          <AnimeCards animeList={animeList} />
        </div>
        <div
          ref={(loadingRef) => {
            this.loadingRef = loadingRef;
          }}
          style={loadingCSS}
        >
          <Loader loading={loading} />
        </div>
      </div>
    );
  }
}
