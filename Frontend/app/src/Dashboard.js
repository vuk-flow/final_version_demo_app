import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "./WorkerListPage";
import axios from "axios";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    

    if (!token) {
      navigate("/login"); 
    }
  }, [navigate]); 

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setMessage("")
    setErrorMsg("")

    try {

      const formData = new FormData();
      formData.append("old_password", oldPassword);
      formData.append("new_password", newPassword);

      const token = localStorage.getItem("token");
      await axios.post(`${url}/api/change-password`, formData,
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Password changed succesfully!")
      setOldPassword("")
      setNewPassword("")
    } catch (error){
      console.log(error)
      setErrorMsg(
        error.response?.data?.detail || "Failed to change password"
      )
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard!</h1>
      <h2 className="text-xl">Hello, {user?.name}!</h2>
      <p>Email: {user?.email}</p>
      <form onSubmit={handleChangePassword} className="mt-6 max-w-md">
        <h3 className="text-lg font-semibold mb-2">Change Password</h3>
        {message && <p className="text-green-600 mb-2">{message}</p>}
        {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}
        <input
          type="password"
          placeholder="Current password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Change Password
        </button>
      </form>
      <button onClick={handleLogout}> Logout </button>
      <a href="/magic">Magic link</a>
    </div>
  );
};

export default DashboardPage;
