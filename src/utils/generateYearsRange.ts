import { TNobelPrize } from "../types";

export const generateYearsRange = (prizes: TNobelPrize[]): string[] => {
  let maxYear = Number(prizes[0]?.awardYear);
  let minYear = Number(prizes[0]?.awardYear);
  prizes.forEach(({ awardYear }) => {
    if (Number(awardYear) > maxYear) maxYear = Number(awardYear);
    if (Number(awardYear) < minYear) minYear = Number(awardYear);
  });
  let yearsList: string[] = [];
  for (let year = minYear; year <= maxYear; year++) {
    yearsList.push(String(year));
  }
  return yearsList;
};
