import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="admin-dashboard-buttons">
        <button onClick={() => navigate("/admin/cardetails")}>Add Cars</button>
        <button onClick={() => navigate("/admin/bookings")}>View Customers</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
