import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate instead of useHistory

function WorkerFormPage() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ updated

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://0.0.0.0:5555/api/workers/", formData);
      setMessage(`Added: ${res.data.name}`);
      setFormData({ name: "", email: "" });
      navigate("/"); // ✅ navigate instead of history.push
    } catch (err) {
      console.error("Error adding worker:", err);
      setMessage(
        "Error: " +
          (err.response?.data?.detail ||
           err.response?.data?.message ||
           JSON.stringify(err.response?.data) ||
           err.message ||
           "Failed to add worker.")
      );
      
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Add Worker</h2>

      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br /><br />
        <label>Email:</label><br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Add Worker</button>
      </form>
      <br></br>
      <a href="/csv">Add with CSV</a> <br></br> <br></br>
      <a href="/delete">Delete user</a> <br></br> <br></br>
      <a href="/edit">Edit user</a> <br></br> <br></br>
      <a href="/">List all user</a> <br></br> <br></br>
      {message && <p style={{ color: message.startsWith("Error") ? "red" : "green" }}>{message}</p>}
    </div>
  );
}

export default WorkerFormPage;
