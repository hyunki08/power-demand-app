import React, { useContext, useState } from "react";
import { DateContext } from "../../contexts/dateContext";
import { createData, createDailyDataset, TimeLabels } from "../../utils/chart";
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
  const meta = useContext(DateContext);
  const [data, setData] = useState(createData([]));
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

    let dataset = [...data.datasets];
    if (dataset.length === 0) {
      TimeLabels.map((label) => dataset.push(createDailyDataset(label, [])));
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
      <DateSelector
        meta={meta}
        dates={dates}
        disabledDate={disabledDate}
        onClickAddDate={onClickAddDate}
        onClickClearDates={onClickClearDates}
        onClickDeleteDate={onClickDeleteDate}
      />
      {loading ? <></> : <Bar options={options} data={data} />}
    </div>
  );
};

export default DailyStack;
