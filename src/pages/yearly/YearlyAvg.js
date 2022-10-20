import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import DateSelector from "../../components/DateSelector";
import { createDefaultDataset, createData, options } from "../../utils/chart";

const YearlyAvg = () => {
  const [data, setData] = useState(createData(["Average"]));
  const [loading, setLoading] = useState(false);

  const fetchYearly = async (year) => {
    setLoading(true);

    const res = await fetch(
      "http://localhost:8080/v1/pd/yearly?year=" + year
    ).then((response) => response.json());

    const total = res[0]["avg_year"];
    const dataset = createDefaultDataset(year, [total]);

    setData({
      ...data,
      datasets: [dataset, ...data.datasets],
    });
    setLoading(false);
  };

  return (
    <div>
      <DateSelector
        fethchData={fetchYearly}
        data={data}
        setData={setData}
        picker="year"
      />
      {loading ? <></> : <Bar options={options} data={data} />}
    </div>
  );
};

export default YearlyAvg;
