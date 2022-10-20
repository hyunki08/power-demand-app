import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import DateSelector from "../../components/DateSelector";
import { createDefaultDataset, createData, options } from "../../utils/chart";

const MonthlyAvg = () => {
  const [data, setData] = useState(createData(["Average"]));
  const [loading, setLoading] = useState(false);

  const fetchMonthly = async (date) => {
    setLoading(true);

    const sp = date.split("-");
    const year = sp[0];
    const month = sp[1];

    const res = await fetch(
      "http://localhost:8080/v1/pd/monthly?year=" + year + "&month=" + month
    ).then((response) => response.json());

    const total = res[0]["avg_month"];
    const dataset = createDefaultDataset(date, [total]);

    setData({
      ...data,
      datasets: [dataset, ...data.datasets],
    });
    setLoading(false);
  };

  return (
    <div>
      <DateSelector
        fethchData={fetchMonthly}
        data={data}
        setData={setData}
        picker="month"
      />
      {loading ? <></> : <Bar options={options} data={data} />}
    </div>
  );
};

export default MonthlyAvg;
