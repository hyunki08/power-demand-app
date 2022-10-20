import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import DateSelector from "../../components/DateSelector";
import {
  TimeLabels,
  createData,
  createHourlyDataset,
  options,
} from "../../utils/chart";

const Hourly = () => {
  const [data, setData] = useState(createData(TimeLabels));
  const [loading, setLoading] = useState(false);

  const fetchHourly = async (date) => {
    setLoading(true);
    const res = await fetch(
      "http://localhost:8080/v1/pd/hourly?date=" + date
    ).then((response) => response.json());

    const demands = Object.keys(res)
      .filter((k) => k.match(new RegExp("[0-9]+")))
      .map((k) => res[k]);
    const dataset = createHourlyDataset(date, demands);

    setData({ ...data, datasets: [dataset, ...data.datasets] });
    setLoading(false);
  };

  return (
    <div>
      <DateSelector fethchData={fetchHourly} data={data} setData={setData} />
      {loading ? <></> : <Line options={options} data={data} />}
    </div>
  );
};

export default Hourly;
