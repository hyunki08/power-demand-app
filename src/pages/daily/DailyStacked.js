import React, { useState } from "react";
import {
  createData,
  TimeLabels,
  createDefaultDataset,
  stackedOptions,
} from "../../utils/chart";
import { Bar } from "react-chartjs-2";
import DateSelector from "../../components/DateSelector";

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

    setData({
      labels: [date, ...data.labels],
      datasets: dataset,
    });
    setLoading(false);
  };

  return (
    <div>
      <DateSelector fethchData={fetchDaily} data={data} setData={setData} />
      {loading ? <></> : <Bar options={stackedOptions} data={data} />}
    </div>
  );
};

export default DailyStack;
