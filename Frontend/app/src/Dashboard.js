import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [navigate]); // Dependency array ensures this runs only once

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard!</h1>
      {/* Add any content you want to display once the user is authenticated */}
    </div>
  );
};

export default DashboardPage;
