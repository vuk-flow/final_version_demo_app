import React, { useEffect, useState } from "react";
import axios from "axios";

export const url = "http://localhost:5555"

function WorkerListPage() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = () => {
    setLoading(true);
    axios.get(`${url}/api/workers/`)
      .then(res => {
        setWorkers(res.data);
        setLoading(false);
      })
      .catch(err => {
        // console.error("Error fetching workers:", err);
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

      <a href="/add">Add Worker</a> <br></br> <br></br>
      <a href="/csv">Add with CSV</a> <br></br> <br></br>
      <a href="/delete">Delete user</a> <br></br> <br></br>
      <a href="/edit">Edit user</a> <br></br> <br></br>
    </div>
  );
}

export default WorkerListPage;
