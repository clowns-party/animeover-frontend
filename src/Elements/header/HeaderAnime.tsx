import Image from "next/image";
import styles from "./header.module.scss";
import { Layout, Input } from "antd";

export const HeaderAnime = () => {
  const { Header } = Layout;
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  return (
    <>
      <Layout>
        <Header
          style={{
            background: "#343434",
            width: "100%",
            height: "40px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className={`${styles.logo_container} ${styles.item}`}>
            <Image src="/hands.svg" alt="logo" width={26} height={26} />
            <div className={`${styles.name} ${styles.item}`}>Clowns Anime</div>
          </div>
          <div className={`${styles.list_anime} ${styles.item}`}>
            Главная
            <div className={styles.arrow}>
              <Image src="/arrow.svg" alt="arrow" width={10} height={10} />
            </div>
          </div>
          <div className={`${styles.item} ${styles.search}`}>
            <Search
              placeholder="Search Anime"
              onSearch={onSearch}
              style={{ width: 500 }}
              enterButton
            />
          </div>
        </Header>
      </Layout>
    </>
  );
};
