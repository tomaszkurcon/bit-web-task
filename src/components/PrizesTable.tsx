import { useReducer, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";

import { TableSortLabel, Typography } from "@mui/material";
import { Languages } from "../enums/Languages";
import { TPrizesTableData } from "../types";
import { Orders } from "../enums/Orders";
import { createCompareFunc } from "../utils/sortDataBy";
import { prizeTableReducer } from "../state/reducers/prizeTableReducer";

type PrizesTableProps = {
  currentLanguage: Languages;
  data: TPrizesTableData[];
};
const tableHeaders = [
  {
    name: "awardYear",
    en: "Award year",
    no: "Tildelingsår",
    se: "Prisår",
  },
  {
    name: "category",
    en: "Category",
    no: "Kategori",
    se: "Kategori",
  },
  {
    name: "dateAwarded",
    en: "Award date",
    no: "Tildelingsdato",
    se: "Prisdatum",
  },
  {
    name: "prizeAmount",
    en: "Prize amount",
    no: "Premiebeløp",
    se: "Prissumma",
  },
];
const PrizesTable = ({ currentLanguage, data }: PrizesTableProps) => {
  const [state, dispatch] = useReducer(prizeTableReducer, {
    tableData: data,
    order: Orders.ASC,
    orderBy: undefined,
  });
  const { tableData, orderBy, order } = state;
  useEffect(() => {
    dispatch({
      type: "SET-TABLE-DATA",
      payload: { order: Orders.ASC, orderBy: undefined, tableData: data },
    });
  }, [data]);

  const onClickSortHandler = (property: keyof TPrizesTableData) => {
    const newOrder: Orders =
      order === Orders.ASC && property === orderBy ? Orders.DESC : Orders.ASC;
    const sortedData = tableData.sort(
      createCompareFunc<TPrizesTableData>(property, newOrder)
    );

    dispatch({
      type: "SORT-TABLE",
      payload: {
        order: newOrder,
        orderBy: property,
        tableData: [...sortedData],
      },
    });
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ backgroundColor: "#FBFBFB" }}>
        <Typography
          variant="h2"
          p={2}
          fontSize={{ xs: 30, sm: 40 }}
          fontWeight="bold"
        >
          Nobel Prizes
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="prize table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={`table-cell-${index}`}>
                  {index !== 0 ? (
                    <TableSortLabel
                      active={header.name === orderBy}
                      direction={header.name === orderBy ? order : Orders.ASC}
                      onClick={() =>
                        onClickSortHandler(
                          header.name as keyof TPrizesTableData
                        )
                      }
                      sx={[
                        !orderBy && {
                          "& .MuiSvgIcon-root": {
                            opacity: 0.1,
                          },
                        },
                      ]}
                    >
                      {header[currentLanguage]}
                    </TableSortLabel>
                  ) : (
                    <>{header[currentLanguage]}</>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {tableData.length !== 0 && (
            <TableBody>
              {tableData.map((prize, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {prize.awardYear}
                  </TableCell>
                  <TableCell>{prize.category}</TableCell>
                  <TableCell>
                    {prize?.dateAwarded
                      ? dayjs(prize.dateAwarded).format("DD-MM-YYYY")
                      : "-"}
                  </TableCell>
                  <TableCell>{prize.prizeAmount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {tableData.length === 0 && (
          <Typography fontSize={24} p={3}>
            No results...
          </Typography>
        )}
      </TableContainer>
    </>
  );
};

export default PrizesTable;
