import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";

import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/hourly" element={<div />} />
          <Route path="/daily" element={<div />} />
          <Route path="/monthly" element={<div />} />
          <Route path="/yearly" element={<div />} />
          <Route path="/*" element={<div>not found</div>} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
}

export default App;
