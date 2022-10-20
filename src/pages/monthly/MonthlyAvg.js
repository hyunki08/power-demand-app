import React, { useContext, useState } from "react";
import { Bar } from "react-chartjs-2";
import MonthSelector from "../../components/MonthSelector";
import { DateContext } from "../../contexts/dateContext";
import { createDefaultDataset, createData } from "../../utils/chart";

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

const MonthlyAvg = () => {
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
    fetchMonthly(date);
  };

  const onClickClearDates = () => {
    setData({ ...data, datasets: [] });
    setDates([]);
  };

  const fetchMonthly = async (date) => {
    setLoading(true);

    const sp = date.split("-");
    const year = sp[0];
    const month = sp[1];

    const res = await fetch(
      "http://localhost:8080/v1/pd/monthly?year=" + year + "&month=" + month
    ).then((response) => response.json());

    const total = res[0]["avg_month"];
    const dataset = createDefaultDataset(date, [total]);

    setData({
      ...data,
      datasets: [dataset, ...data.datasets],
    });
    setLoading(false);
  };

  return (
    <div>
      <MonthSelector
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

export default MonthlyAvg;
