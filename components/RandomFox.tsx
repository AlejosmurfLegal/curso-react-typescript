import React, { useEffect, useState, useRef } from "react";

type Props = {
  img: string;
  alt: string;
};

export const RandomFox = ({ img, alt }: Props): React.JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [src, setSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSrc(img)
        }
      });
    });

    if (node.current) {
      observer.observe(node.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [img]);

  return (
    <img
      ref={node}
      width={320}
      height="auto"
      src={src}
      alt={alt}
      className="rounded bg-gray-300"
    />
  );
};
