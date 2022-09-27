import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { TimeLabels, createData, createDataset } from "../../utils/chart";

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
};

const Hourly = () => {
  const [data, setData] = useState(createData(TimeLabels));
  const [loading, setLoading] = useState(true);

  const fetchHourly = async (date) => {
    const res = await fetch(
      "http://localhost:8080/v1/pd/date?date=" + date
    ).then((response) => response.json());

    const demands = Object.keys(res)
      .filter((k) => k.match(new RegExp("[0-9]+")))
      .map((k) => res[k]);
    let dataSet = createDataset(date, demands);
    const nData = data;
    nData.datasets.push(dataSet);
    setData(nData);
    setLoading(false);

    console.log(nData);
  };

  useEffect(() => {
    fetchHourly("2020-02-01");
  }, []);

  return loading ? <></> : <Line options={options} data={data} />;
};

export default Hourly;
