import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WorkerFormPage from "./WorkerFormPage";
import WorkerListPage from "./WorkerListPage";
import EditWorkerForm from "./WorkerEditPage";
import DeleteWorkerForm from "./WorkerDeletePage";
import FileUploadPage from "./FileUploadPage";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial" }}>
        <h1>Worker List</h1>
        <Routes>
          <Route path="/" element={<WorkerListPage />} />
          <Route path="/add" element={<WorkerFormPage />} />
          <Route path="/edit" element={<EditWorkerForm />} />
          <Route path="/delete" element={<DeleteWorkerForm />} />
          <Route path="/csv" element={<FileUploadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
