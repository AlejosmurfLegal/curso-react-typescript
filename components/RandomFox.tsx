import React, { useRef } from "react";

type Props = {
  img: string;
  alt: string;
};

export const RandomFox = ({ img, alt }: Props): React.JSX.Element => {
  const node = useRef<HTMLImageElement>(null);

  return (
    <img ref={node} width={320} height="auto" src={img} alt={alt} className="rounded" />
  );
};
