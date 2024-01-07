// LoginPage.js
import React, { useRef, useState } from "react";
import axios from "axios";
import TodosPage from "./TodosPage";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (response.data.msg === "Login successful") {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  function handleClick() {
    // Use navigate to navigate to the signup page
    navigate("/signup");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
      {isAuthenticated ? (
        <TodosPage />
      ) : (
        <div className="bg-gray-800 p-11 rounded-3xl shadow-md w-96">
          <h2 className="text-3xl font-extrabold mb-6">Login</h2>
          <div className="mb-6">
            <label htmlFor="email" className="text-gray-300">
              Email:
            </label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              className="w-full p-3 border rounded-3xl bg-gray-700 text-white"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-gray-300">
              Password:
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              className="w-full p-3 border rounded-3xl bg-gray-700 text-white"
            />
          </div>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white w-full p-3 rounded-full hover:bg-blue-700"
          >
            Submit
          </button>
          <p
            onClick={handleClick}
            className="mt-4 text-gray-300 text-center font-ui-serif font-thin  "
          >
            Not registered?{" "}
            <span className="cursor-pointer text-blue-500">
              Create an account
            </span>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
