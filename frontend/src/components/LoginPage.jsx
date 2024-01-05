import React, { useRef, useState } from "react";
import axios from "axios";
import TodosPage from "./TodosPage";

const LoginForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
      {isAuthenticated ? (
        <TodosPage />
      ) : (
        <div className="bg-gray-800 p-11 rounded-full shadow-md w-96">
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
        </div>
      )}
    </div>
  );
};

export default LoginForm;
