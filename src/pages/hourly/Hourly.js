import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { TimeLabels, createData, createHourlyDataset } from "../../utils/chart";
import { DateContext } from "../../contexts/dateContext";
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
};

const Hourly = () => {
  const meta = useContext(DateContext);
  const [data, setData] = useState(createData(TimeLabels));
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);

  const onClickDeleteDate = (date) => {
    const index = dates.findIndex((d) => d === date);
    setData({
      ...data,
      datasets: data.datasets.filter((d) => d.label !== date),
    });
    setDates([...dates.slice(0, index), ...dates.slice(index + 1)]);
  };

  const onClickClearDates = () => {
    setData({ ...data, datasets: [] });
    setDates([]);
  };

  const onClickAddDate = (date) => {
    console.log([date, ...dates]);
    setDates([date, ...dates]);
    fetchHourly(date);
  };

  const disabledDate = (current) => {
    return !current.isBetween(meta.minDate, meta.maxDate);
  };

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
      <DateSelector
        meta={meta}
        dates={dates}
        disabledDate={disabledDate}
        onClickAddDate={onClickAddDate}
        onClickClearDates={onClickClearDates}
        onClickDeleteDate={onClickDeleteDate}
      />
      {loading ? <></> : <Line options={options} data={data} />}
    </div>
  );
};

export default Hourly;
