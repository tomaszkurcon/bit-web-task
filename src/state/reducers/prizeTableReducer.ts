import { Reducer } from "react";
import { Orders } from "../../enums/Orders";
import { TPrizesTableData } from "../../types";

type TAction = {
  type: string;
  payload: TPrizeTableState;
};
type TPrizeTableState = {
  order: Orders;
  orderBy: keyof TPrizesTableData | undefined;
  tableData: TPrizesTableData[];
};
export const prizeTableReducer: Reducer<TPrizeTableState, TAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "SET-ORDER":
      return { ...state, order: action.payload.order };
    case "SET-ORDER-BY":
      return { ...state, orderBy: action.payload.orderBy };
    case "SET-TABLE-DATA":
      return { ...state, tableData: [...action.payload.tableData] };
    case "SORT-TABLE":
      return {order:action.payload.order, orderBy:action.payload.orderBy, tableData:[...action.payload.tableData]}  
    default:
      return state;
  }
};
