import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import "chart.js/auto";

import { DateContext } from "./contexts/dateContext";
import DefaultLayout from "./layouts/DefaultLayout";

import Hourly from "./pages/hourly/Hourly";
import DailyTotal from "./pages/daily/DailyTotal";
import DailyAvg from "./pages/daily/DailyAvg";
import DailyStacked from "./pages/daily/DailyStacked";
import MonthlyTotal from "./pages/monthly/MonthlyTotal";
import MonthlyAvg from "./pages/monthly/MonthlyAvg";
import YearlyTotal from "./pages/yearly/YearlyTotal";
import YearlyAvg from "./pages/yearly/YearlyAvg";

function App() {
  const [metadata, setMetadata] = useState({
    maxDate: "",
    minDate: "",
  });

  const fetchMetadata = async () => {
    const res = await fetch("http://localhost:8080/v1/pd/").then((response) =>
      response.json()
    );
    setMetadata({ ...res });
  };

  useEffect(() => {
    fetchMetadata();
  }, []);

  return (
    <DateContext.Provider value={metadata}>
      <Router>
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<div />} />
            <Route path="/hourly" element={<Hourly />} />
            <Route path="/daily/total" element={<DailyTotal />} />
            <Route path="/daily/stacked" element={<DailyStacked />} />
            <Route path="/daily/avg" element={<DailyAvg />} />
            <Route path="/monthly/total" element={<MonthlyTotal />} />
            <Route path="/monthly/avg" element={<MonthlyAvg />} />
            <Route path="/yearly/total" element={<YearlyTotal />} />
            <Route path="/yearly/avg" element={<YearlyAvg />} />
            <Route path="/*" element={<div>not found</div>} />
          </Routes>
        </DefaultLayout>
      </Router>
    </DateContext.Provider>
  );
}

export default App;
