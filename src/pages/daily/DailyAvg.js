import React, { useState } from "react";
import { createData, createDefaultDataset } from "../../utils/chart";
import { Bar } from "react-chartjs-2";
import DateSelector from "../../components/DateSelector";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
    },
  },
};

const DailyAvg = () => {
  const [data, setData] = useState(createData(["Average"]));
  const [loading, setLoading] = useState(false);

  const fetchDaily = async (date) => {
    setLoading(true);
    const res = await fetch(
      "http://localhost:8080/v1/pd/daily?date=" + date
    ).then((response) => response.json());
    const total = res[0]["avg"];

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

export default DailyAvg;
