import React, { useState } from "react";
import {
  createData,
  TimeLabels,
  createDefaultDataset,
} from "../../utils/chart";
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
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const DailyStack = () => {
  const [data, setData] = useState(createData([]));
  const [loading, setLoading] = useState(false);

  const fetchDaily = async (date) => {
    setLoading(true);
    const res = await fetch(
      "http://localhost:8080/v1/pd/daily?date=" + date
    ).then((response) => response.json());

    let dataset = [...data.datasets];
    if (dataset.length === 0) {
      TimeLabels.map((label) => dataset.push(createDefaultDataset(label, [])));
    }

    const regex = new RegExp("[0-9]+");
    Object.entries(res[0])
      .filter(([key, value]) => key.match(regex))
      .forEach((obj) => {
        dataset.find(({ label }) => label === obj[0])?.data.push(obj[1]);
      });
    console.log(dataset);

    setData({
      labels: [date, ...data.labels],
      datasets: dataset,
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

export default DailyStack;
