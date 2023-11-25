import { useState, useEffect } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import { Languages } from "../enums/Languages";
import { TNobelPrize } from "../types";
import { TableSortLabel } from "@mui/material";
import { createCompareFunc } from "../utils/sortDataBy";
import { Orders } from "../enums/Orders";

type TableData = {
  awardYear: string;
  category: string;
  dateAwarded: string;
  prizeAmount: number;
};
const Prizes = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [orderBy, setOrderBy] = useState<keyof TableData>();
  const [order, setOrder] = useState<Orders>(Orders.ASC);
  const { language, year } = useParams();
  const prizes = useRouteLoaderData("root") as TNobelPrize[];
  const currentLanguage: Languages = (language as Languages) ?? "en";
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
  useEffect(() => {
    const tableData: TableData[] = prizes
      .filter((prize) => prize.awardYear === year)
      .map((prize) => {
        return {
          awardYear: prize.awardYear,
          category: prize.category[currentLanguage],
          dateAwarded: prize.dateAwarded,
          prizeAmount: prize.prizeAmount,
        };
      });

    setTableData(tableData);
  }, [prizes, currentLanguage, year]);

  const onClickSortHandler = (property: keyof TableData) => {
    const newOrder: Orders =
      order === Orders.ASC && property === orderBy ? Orders.DESC : Orders.ASC;
    const sortedData = tableData.sort(
      createCompareFunc<TableData>(property, newOrder)
    );

    setOrderBy(property);

    setOrder(newOrder);

    setTableData([...sortedData]);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="prize table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={`table-cell-${index}`}>
                  {index !== 0 ? (
                    <TableSortLabel
                      active={header.name === orderBy}
                      direction={order}
                      onClick={() =>
                        onClickSortHandler(header.name as keyof TableData)
                      }
                      sx={[
                        !orderBy && {
                          "& .MuiSvgIcon-root": {
                            opacity:0.1,
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
          <TableBody>
            {tableData.map(
              (prize, index) =>
                prize.awardYear === year && (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {prize.awardYear}
                    </TableCell>
                    <TableCell>{prize.category}</TableCell>
                    <TableCell>
                      {dayjs(prize.dateAwarded).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>{prize.prizeAmount.toLocaleString()}</TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Prizes;
