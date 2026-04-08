import React from "react";

const generateRandomNumber = (): number => {
  return Math.floor(Math.random() * 123) + 1;
};

export const RandomFox = (): React.JSX.Element => {
  const imgNumber: number = generateRandomNumber();
  const image: string = `https://randomfox.ca/images/${imgNumber}.jpg`;

  return <img width={320} height="auto" src={image} className="rounded" />;
};
