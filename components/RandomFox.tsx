import React from "react";

type Props = {
  img: string;
  alt: string;
};

export const RandomFox = ({ img, alt }: Props): React.JSX.Element => {
  return (
    <img width={320} height="auto" src={img} alt={alt} className="rounded" />
  );
};
