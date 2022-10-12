import React, { useContext, useState } from "react";
import { DateContext } from "../../contexts/dateContext";
import { createData, createDailyDataset } from "../../utils/chart";
import styles from "../../styles/Daily.module.css";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import { DatePicker, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

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

const DailyAvg = () => {
  const meta = useContext(DateContext);
  const [data, setData] = useState(createData(["Average"]));
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);

  const disabledDate = (current) => {
    return !current.isBetween(meta.minDate, meta.maxDate);
  };

  const onClickDeleteDate = (date) => {
    const index = dates.findIndex((d) => d === date);
    setData({
      ...data,
      datasets: data.datasets.filter((d) => d.label !== date),
    });
    setDates([...dates.slice(0, index), ...dates.slice(index + 1)]);
  };

  const onClickAddDate = (date) => {
    setDates([date, ...dates]);
    fetchDaily(date);
  };

  const onClickClearDates = () => {
    setData({ ...data, datasets: [] });
    setDates([]);
  };

  const fetchDaily = async (date) => {
    setLoading(true);
    const res = await fetch(
      "http://localhost:8080/v1/pd/daily?date=" + date
    ).then((response) => response.json());
    const total = res[0]["avg"];

    const dataset = createDailyDataset(date, [total]);

    setData({
      ...data,
      datasets: [dataset, ...data.datasets],
    });
    setLoading(false);
  };

  return (
    <div>
      <div className={styles.datepickerwrapper}>
        <DatePicker
          className={styles.datepicker}
          defaultValue={moment(meta.maxDate)}
          disabledDate={disabledDate}
          onChange={(_, date) => onClickAddDate(date)}
        />
        <div className={styles.dates}>
          {!!dates && dates.length > 0 && (
            <Button type="primary" onClick={onClickClearDates}>
              Clear
            </Button>
          )}
          {!!dates &&
            dates.length > 0 &&
            dates.map((date, i) => (
              <div
                key={i}
                className={styles.date}
                onClick={() => onClickDeleteDate(date)}
              >
                {date}
                <CloseOutlined className={styles.datedelete} />
              </div>
            ))}
        </div>
      </div>
      {loading ? <></> : <Bar options={options} data={data} />}
    </div>
  );
};

export default DailyAvg;
