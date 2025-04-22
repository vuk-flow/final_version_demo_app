import React, { useState } from "react";
import axios from "axios";
import { url } from "./WorkerListPage";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(`${url}/api/register`, formData);
      setMessage("Registration successful!");
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail);
      } else {
        setMessage("Something went wrong.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full p-2 border rounded-md"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-2 border rounded-md"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>

        {message && <p className="text-center text-sm text-red-600">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
