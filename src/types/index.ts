import { Languages } from "../enums/Languages";

type TLink = {
  action: string;
  href: string;
  rel: string;
  types: string;
};
export type TLanguages = {
  [key in Languages]: string;
};
type TLaureate = {
  fullName: TLanguages;
  id: string;
  knownName: TLanguages;
  links: TLink[];
  motivation: TLanguages;
  portion: string;
  sortOrder: string;
};
export type TNobelPrize = {
  awardYear: string;
  category: TLanguages;
  categoryFullName: TLanguages;
  dateAwarded: string;
  laureates: TLaureate[];
  links: TLink[];
  prizeAmount: number;
  prizeAmountAdjusted: number;
};

export type TPrizesTableData = {
  awardYear: string;
  category: string;
  dateAwarded: string;
  prizeAmount: number;
};
