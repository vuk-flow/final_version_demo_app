import React, { useEffect, useState } from "react";
import axios from "axios";

function WorkerListPage() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = () => {
    setLoading(true);
    axios.get("http://127.0.0.1:8000/api/workers")
      .then(res => {
        setWorkers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching workers:", err);
        setError("Failed to fetch workers.");
        setLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Worker List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {workers.map((worker) => (
            <li key={worker.id}>
              {worker.name} ({worker.email})
            </li>
          ))}
        </ul>
      )}

      <a href="/add-worker">Add Worker</a>
    </div>
  );
}

export default WorkerListPage;
