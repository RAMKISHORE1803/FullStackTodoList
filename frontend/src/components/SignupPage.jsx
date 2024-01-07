import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const reenterPasswordRef = useRef(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  async function handleSignup() {
    const name = nameRef.current.value;
    const username = emailRef.current.value;
    const password = passwordRef.current.value;
    const reenteredPassword = reenterPasswordRef.current.value;

    // Basic validation for password match
    if (password !== reenteredPassword) {
      console.error("Passwords do not match");
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        name,
        username,
        password,
      });

      if (response.data.msg === "User registered successfully") {
        setIsRegistered(true);
        alert("Your account has been created, you can now login.");
        navigate("/");
      }
    } catch (error) {
      console.error("Signup failed", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
      <div className="bg-gray-800 p-11 rounded-3xl shadow-md w-96">
        <h2 className="text-3xl font-extrabold mb-6">Signup</h2>
        <div className="mb-6">
          <label htmlFor="name" className="text-gray-300">
            Name:
          </label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            className="w-full p-3 border rounded-3xl bg-gray-700 text-white"
          />
        </div>
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
        <div className="mb-6">
          <label htmlFor="reenterPassword" className="text-gray-300">
            Re-enter Password:
          </label>
          <input
            type="password"
            id="reenterPassword"
            ref={reenterPasswordRef}
            className="w-full p-3 border rounded-3xl bg-gray-700 text-white"
          />
        </div>
        <button
          onClick={handleSignup}
          className="bg-green-500 text-white w-full p-3 rounded-full hover:bg-green-700"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
