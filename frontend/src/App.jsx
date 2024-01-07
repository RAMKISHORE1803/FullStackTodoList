import React from "react";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
