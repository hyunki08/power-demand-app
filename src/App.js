import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import "chart.js/auto";

import { DateContext } from "./contexts/dateContext";
import DefaultLayout from "./layouts/DefaultLayout";

import Hourly from "./pages/hourly/Hourly";

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
            <Route path="/daily" element={<div />} />
            <Route path="/monthly" element={<div />} />
            <Route path="/yearly" element={<div />} />
            <Route path="/*" element={<div>not found</div>} />
          </Routes>
        </DefaultLayout>
      </Router>
    </DateContext.Provider>
  );
}

export default App;
