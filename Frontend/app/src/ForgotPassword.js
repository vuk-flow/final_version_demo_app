import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "./WorkerListPage";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const response = await axios.post(`${url}/api/check-email`, { email });
      localStorage.setItem("reset_email", email);
      
      navigate("/reset-password");
    } catch (error) {
      setErrorMsg(error.response ? error.response.data.detail : "An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleForgotPassword} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        {message && <p className="text-green-500 mb-2">{message}</p>}
        {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
