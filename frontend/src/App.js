import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import OpenRoute from "./components/Core/auth/openRoute";
import PrivateRoute from "./components/Core/auth/privateRoute";
import ForgotPassword from "./Pages/Forgotpassword";
import UpadatePassword from "./Pages/updatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import Error from "./Pages/error404";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <Router>
      <div className="w-100vh min-h-screen bg-richblack-900 flex flex-col font-inter overflow-x-hidden">
        <Navbar />
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route
            path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
          <Route
            path="update-password/:id"
            element={
              <OpenRoute>
                <UpadatePassword />
              </OpenRoute>
            }
          />
          <Route
            path="verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />
          <Route path="about" element={<About />} />
          <Route
            path="login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
