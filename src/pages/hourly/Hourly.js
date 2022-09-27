import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { DatePicker } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { TimeLabels, createData, createDataset } from "../../utils/chart";
import styles from "../../styles/Hourly.module.css";

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
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const onClickDeleteDate = (date) => {
    const index = dates.findIndex((d) => d === date);
    setData({
      ...data,
      datasets: data.datasets.filter((d) => d.label !== date),
    });
    setDates([...dates.slice(0, index), ...dates.slice(index + 1)]);
  };

  const onClickAddDate = (date) => {
    console.log([date, ...dates]);
    setDates([date, ...dates]);
    fetchHourly(date);
  };

  const fetchHourly = async (date) => {
    setLoading(true);
    const res = await fetch(
      "http://localhost:8080/v1/pd/date?date=" + date
    ).then((response) => response.json());

    const demands = Object.keys(res)
      .filter((k) => k.match(new RegExp("[0-9]+")))
      .map((k) => res[k]);
    let dataSet = createDataset(date, demands);

    let nData = data;
    nData.datasets.push(dataSet);
    setData(nData);
    setLoading(false);
  };

  return (
    <div>
      <div className={styles.datepicker}>
        <DatePicker onChange={(_, date) => onClickAddDate(date)} />
        <div className={styles.dates}>
          {!!dates &&
            dates.map((date, i) => (
              <div
                key={i}
                className={styles.date}
                onClick={() => onClickDeleteDate(date)}
              >
                {date}
                <CloseOutlined />
              </div>
            ))}
        </div>
      </div>
      {loading ? <></> : <Line options={options} data={data} />}
    </div>
  );
};

export default Hourly;
