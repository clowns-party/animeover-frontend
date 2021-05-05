import { AnimeList } from "bus/anime/types";
import React from "react";
import { service } from "Services";
import { AnimeCards } from "./AnimeCards";

type State = {
  animeList: AnimeList | [];
  page: number;
  loading: boolean;
  prevY: number;
};
type Props = any;
export class InfiniteScroll extends React.Component<Props, State> {
  observer: IntersectionObserver;
  loadingRef: HTMLDivElement;
  constructor(props: Props) {
    super(props);
    this.state = {
      animeList: [],
      page: 1,
      loading: false,
      prevY: 0,
    };
  }

  componentDidMount() {
    const { page } = this.state;
    this.getUsers(page);
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
      this.getUsers(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }

  getUsers(page) {
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
      height: "100px",
      margin: "30px",
    };
    const loadingTextCSS = { display: loading ? "block" : "none" };
    return (
      <div className="container">
        <div style={{ minHeight: "800px" }}>
          <AnimeCards animeList={animeList} />
        </div>
        <div
          ref={(loadingRef) => {
            this.loadingRef = loadingRef;
          }}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>
    );
  }
}
