import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./homepage/homepage";
import Login from "./login/login";
import Signup from "./signup/signup";
import WelcomePage from "./welcomepage/WelcomePage";
import AdminCarDetails from "./adminCarDetails/AdminCarDetails";
import AdminDashboard from "./Admin/AdminDashboard";
import ViewCustomers from "./Admin/ViewCustomers";
import CarBooking from "./carbooking/carbooking";
import ViewCarsPage from "./ViewPage/ViewCarsPage";
import ViewBookingsPage from "./ViewBookingsPage/ViewBookingsPage";
import BookingSummary from "./BookingSummary/BookingSummary"; // ✅ New component
import FeedbackPage from "./Feedback/FeedbackPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Mock fetchCars function
  const fetchCars = async () => {
    // Replace this with an actual API call if needed
    const cars = [
      { model: "Model X", regNumber: "ABC123" },
      { model: "Model X", regNumber: "DEF456" },
      { model: "Model Y", regNumber: "GHI789" },
      { model: "Model Z", regNumber: "JKL012" },
    ];

    // Ensure distinct models
    const distinctModels = Array.from(new Set(cars.map(car => car.model))).map(model => ({
      model,
      regNumbers: cars.filter(car => car.model === model).map(car => car.regNumber),
    }));

    return distinctModels;
  };

  // Persist authentication across reloads
  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated") === "true";
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setIsAuthenticated(savedAuth);
    setUser(savedUser);
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Homepage />} />
      <Route
        path="/login"
        element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />}
      />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Welcome Page */}
      <Route
        path="/welcome"
        element={
          isAuthenticated ? (
            <WelcomePage userName={user?.uname || user?.username || "User"} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Feedback Page */}
      <Route
        path="/feedback"
        element={
          isAuthenticated ? <FeedbackPage fetchCars={fetchCars} /> : <Navigate to="/login" replace />
        }
      />

  {/* Admin Pages */}
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/admin/cardetails" element={<AdminCarDetails />} />
  <Route path="/admin/bookings" element={<ViewCustomers />} />

      {/* Protected Routes */}
      <Route
        path="/cars"
        element={isAuthenticated ? <ViewCarsPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/book/:carId"
        element={<CarBooking user={user} />}
      />
      <Route
        path="/bookings"
        element={isAuthenticated ? <ViewBookingsPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/summary"
        element={isAuthenticated ? <BookingSummary /> : <Navigate to="/login" replace />}
      />

      {/* Catch-All Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
