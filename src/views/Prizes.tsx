import { useState, useEffect } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";

import { Languages } from "../enums/Languages";
import { TNobelPrize, TPrizesTableData } from "../types";

import PrizesTable from "../components/PrizesTable";

const Prizes = () => {
  const [prizesData, setPrizesData] = useState<TPrizesTableData[]>([]);
  const { language, year } = useParams();
  const prizes = useRouteLoaderData("root") as TNobelPrize[];
  const currentLanguage: Languages = (language as Languages) ?? "en";

  useEffect(() => {
    const tableData: TPrizesTableData[] = prizes
      .filter((prize) => prize.awardYear === year)
      .map((prize) => {
        return {
          awardYear: prize.awardYear,
          category: prize.category[currentLanguage],
          dateAwarded: prize.dateAwarded,
          prizeAmount: prize.prizeAmount,
        };
      });
    setPrizesData([...tableData]);
  }, [prizes, currentLanguage, year]);

  return <PrizesTable currentLanguage={currentLanguage} data={prizesData} />;
};

export default Prizes;
