import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WorkerFormPage from "./WorkerFormPage";
import WorkerListPage from "./WorkerListPage";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial" }}>
        <h1>Worker List</h1>
        <Routes>
          <Route path="/" element={<WorkerListPage />} />
          <Route path="/add-worker" element={<WorkerFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
