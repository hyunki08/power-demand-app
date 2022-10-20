import React, { useState } from "react";
import { createData, createDefaultDataset, options } from "../../utils/chart";
import { Bar } from "react-chartjs-2";
import DateSelector from "../../components/DateSelector";

const DailyTotal = () => {
  const [data, setData] = useState(createData(["Total"]));
  const [loading, setLoading] = useState(false);

  const fetchDaily = async (date) => {
    setLoading(true);
    const res = await fetch(
      "http://localhost:8080/v1/pd/daily?date=" + date
    ).then((response) => response.json());
    const total = res[0]["sum"];

    const dataset = createDefaultDataset(date, [total]);

    setData({
      ...data,
      datasets: [dataset, ...data.datasets],
    });
    setLoading(false);
  };

  return (
    <div>
      <DateSelector fethchData={fetchDaily} data={data} setData={setData} />
      {loading ? <></> : <Bar options={options} data={data} />}
    </div>
  );
};

export default DailyTotal;
