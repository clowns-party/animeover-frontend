import App from "./../src/App";
import { HeaderAnime } from './../src/Elements/header/HeaderAnime';

export default function Home() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <HeaderAnime />
      <App />
    </div>
  );
}
