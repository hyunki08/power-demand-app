import React, { useContext, useState } from "react";
import { Bar } from "react-chartjs-2";
import YearSelector from "../../components/YearSelector";
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

const YearlyTotal = () => {
  const meta = useContext(DateContext);
  const [data, setData] = useState(createData(["Total"]));
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

  const fetchMonthly = async (year) => {
    setLoading(true);

    const res = await fetch(
      "http://localhost:8080/v1/pd/yearly?year=" + year
    ).then((response) => response.json());

    const total = res[0]["sum_year"];
    const dataset = createDefaultDataset(year, [total]);

    setData({
      ...data,
      datasets: [dataset, ...data.datasets],
    });
    setLoading(false);
  };

  return (
    <div>
      <YearSelector
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

export default YearlyTotal;
