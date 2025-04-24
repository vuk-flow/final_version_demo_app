import React, { useState,useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { url } from "./WorkerListPage";
import { useNavigate } from "react-router-dom";

const ResetPasswordTest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // const token = localStorage.getItem("token");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInToken = localStorage.getItem("token");
    if (!loggedInToken) {
      navigate("/login"); // Redirect to login if no token found
    } else {
      setIsLoggedIn(true); // User is logged in
    }
  }, [navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("token", token); // Ensure token is included
    formData.append("new_password", newPassword);

    try {
      const response = await axios.post(`${url}/api/reset-password-link`, formData);
      setMessage("Password reset successfully!");
    } catch (err) {
      setMessage("Reset failed.");
      console.error("Error: ", err.response?.data || err);    }
  };

  return (
    <form onSubmit={handleReset}>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ResetPasswordTest;
