import { Box, Button, MenuItem, Stack, Typography } from "@mui/material";
import CustomSelect from "../components/common/CustomSelect";
import React, { useEffect, useReducer } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import { generateYearsRange } from "../utils/generateYearsRange";
import { Languages } from "../enums/Languages";
import { TNobelPrize } from "../types";

import Flag from "../components/common/Flag";
import { homePageReducer } from "../state/reducers/homePageReducer";

const HomePage = () => {
  const [state, dispatch] = useReducer(homePageReducer, {
    year: "",
    yearsList: [],
    language: Languages.EN,
  });
  const prizes = useRouteLoaderData("root") as TNobelPrize[];

  useEffect(() => {
    const yearsList = generateYearsRange(prizes);
    dispatch({
      type: "SET-YEARS-RANGE",
      payload: { year: "", yearsList: yearsList, language: Languages.EN },
    });
  }, [prizes, dispatch]);

  const selectYearHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET-YEAR",
      payload: { ...state, year: event.target.value },
    });
  };

  const selectLanguageHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "SET-LANGUAGE",
      payload: { ...state, language: event.target.value as Languages },
    });
  };

  const { year, yearsList, language } = state;

  return (
    <Stack alignItems={"center"}>
      <Typography variant="h1">Hi!</Typography>
      <Typography textAlign="center">
        This site enables you to check all the Nobel's prizes for selected year
      </Typography>
      <Stack
        flexDirection={{ xs: "column", sm: "row" }}
        gap={{ xs: 0, sm: 4 }}
        mb={{ xs: 4, sm: 0 }}
      >
        <CustomSelect label="Year" onChange={selectYearHandler} value={year}>
          {yearsList.map((year, index) => (
            <MenuItem key={`${index}+${year}`} value={year}>
              {year}
            </MenuItem>
          ))}
        </CustomSelect>
        <CustomSelect
          label="Language"
          onChange={selectLanguageHandler}
          value={language}
        >
          {(Object.keys(Languages) as Array<keyof typeof Languages>).map(
            (key, index) => (
              <MenuItem key={index + key} value={Languages[key]}>
                <Stack flexDirection={"row"} gap={2}>
                  <Box
                    component={Flag}
                    language={Languages[key]}
                    width={40}
                  ></Box>
                  {Languages[key]}
                </Stack>
              </MenuItem>
            )
          )}
        </CustomSelect>
      </Stack>
      <Button
        component={Link}
        to={`/prizes/${language}/${year}`}
        disabled={!year || !language}
        variant="contained"
        sx={{ textTransform: "none" }}
      >
        <Typography>Search for prizes</Typography>
      </Button>
    </Stack>
  );
};

export default HomePage;
