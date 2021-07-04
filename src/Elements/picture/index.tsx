import React, { ImgHTMLAttributes, useRef } from "react";

type Props = {
  url: string;
  other?: ImgHTMLAttributes<HTMLImageElement>;
};

const Picture = ({ url, ...other }) => {
  const ref = useRef<HTMLImageElement>(null);

  const onload = () => {};
  const onerror = () => {
    ref.current.src = "https://cdn.myanimelist.net/images/qm_50.gif";
  };

  return (
    <img
      {...other}
      src={url}
      alt={other.alt || ""}
      ref={ref}
      onLoad={onload}
      onError={onerror}
    />
  );
};

export default Picture;
