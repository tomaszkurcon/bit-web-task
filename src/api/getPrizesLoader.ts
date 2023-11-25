export const prizesLoader = async () => {
  const response = await fetch("https://api.nobelprize.org/2.1/nobelPrizes");
  const { nobelPrizes } = await response.json();
  return nobelPrizes;
};
