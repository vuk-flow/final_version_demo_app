import React, { useState } from 'react';
import axios from 'axios';
import { url } from './WorkerListPage';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
  
    try {
      const response = await axios.post(`${url}/api/login`, {
        email,
        password,
      });
  
      const token = response.data.access_token;
      const user = response.data.user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/dashboard");  // Redirect to dashboard after login
    } catch (error) {
      if (error.response && error.response.data) {
        // Check if errorMsg is an object and handle it accordingly
        const errorData = error.response.data.detail;
        if (typeof errorData === 'object') {
          setErrorMsg(JSON.stringify(errorData));  // Convert object to string
        } else {
          setErrorMsg(errorData || 'An unknown error occurred');
        }
      } else {
        setErrorMsg('Login failed. Please try again.');
      }
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br></br>
        <br></br>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <br></br>
        <br></br>
        <br></br>
        <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot password?</a>
      </form>
    </div>
  );
};

export default Login;
