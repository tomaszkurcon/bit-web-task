import { Reducer } from "react";
import { Languages } from "../enums/Languages";

type TAction = {
  type: string;
  payload: THomePageState;
};
export type THomePageState = {
  year: string;
  language?: Languages;
  yearsList: string[];
};
export const homePageReducer: Reducer<THomePageState, TAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "SET-YEAR":
      return { ...state, year: action.payload.year };
    case "SET-LANGUAGE":
      return { ...state, language: action.payload.language };
    case "SET-YEARS-RANGE":
      return { ...state, yearsList: action.payload.yearsList };
    default:
      return state;
  }
};
