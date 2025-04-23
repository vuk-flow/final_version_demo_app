import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard!</h1>
      <h2 className="text-xl">Hello, {user?.name}!</h2>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout}> Logout </button>
    </div>
  );
};

export default DashboardPage;
