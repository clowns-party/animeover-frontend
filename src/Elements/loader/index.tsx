import React, { FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const Loader: FC<{ loading: boolean }> = ({ loading }) => {
  const loadingTextCSS = {
    display: loading ? "flex" : "none",
    justifyContent: "center",
  };
  return (
    <span style={loadingTextCSS}>
      <LoadingOutlined
        style={{
          color: "#1890ff",
          fontSize: 30,
        }}
      />
    </span>
  );
};

export default Loader;
