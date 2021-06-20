import { Header } from "Elements/header";
import router, { useRouter } from "next/router";
import React, { useEffect } from "react";

const AnimePage = () => {
  useRouter();
  useEffect(() => {
    router.push("/anime/page/1");
  }, []);
  return (
    <>
      <Header />
    </>
  );
};

export default AnimePage;
