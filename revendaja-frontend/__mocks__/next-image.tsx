import React from "react";

const Image = ({
  src,
  alt,
  width,
  height,
  ...props
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  [key: string]: any;
}) => {
  return <img src={src} alt={alt} width={width} height={height} {...props} />;
};

export default Image;
