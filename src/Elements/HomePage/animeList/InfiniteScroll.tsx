import React from "react";
import { service } from "Services";
import { AnimeCards } from "./AnimeCards";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

export class InfiniteScroll extends React.Component {
  observer: any;
  loadingRef: any;
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      page: 1,
      loading: false,
      prevY: 0,
    };
  }

  componentDidMount() {
    this.getUsers(this.state.page);

    // Options
    const options = {
      root: null, // Page as root
      rootMargin: "0px",
      threshold: 1.0,
    };
    // Create an observer
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this), //callback
      options
    );
    // Observ the `loadingRef`
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const { y } = entities[0].boundingClientRect;
    if (this.state.prevY > y) {
      const curPage = this.state.page + 1;
      this.getUsers(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }

  getUsers(page) {
    this.setState({ loading: true });
    service.animeService.animeList(20, page).then((res) => {
      // @ts-ignore
      this.setState({ users: [...this.state.users, ...res.data.animeList] });
      this.setState({ loading: false });
    });
  }

  render() {
    const loadingCSS = {
      height: "100px",
      margin: "30px",
    };
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
    return (
      <div className="container">
        <div style={{ minHeight: "800px" }}>
          <AnimeCards animeList={this.state.users} />
        </div>
        <div
          ref={(loadingRef) => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>
    );
  }
}
