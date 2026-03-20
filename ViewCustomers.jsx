import React, { useEffect, useState } from "react";
import "./ViewCustomers.css";

const ViewCustomers = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3002/admin/bookings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="view-customers-container">
      <h2>All Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((b) => (
            <div key={b.booking_id} className="booking-card">
              <p><strong>Booking ID:</strong> {b.booking_id}</p>
              <p><strong>Car ID:</strong> {b.car_id}</p>
              <p><strong>Name:</strong> {b.name}</p>
              <p><strong>Phone:</strong> {b.phone_number}</p>
              <p><strong>Email:</strong> {b.email}</p>
              <p><strong>Start Date:</strong> {b.start_date}</p>
              <p><strong>Days:</strong> {b.days}</p>
              <p><strong>Booking Time:</strong> {b.booking_time}</p>
              <p><strong>End Date:</strong> {b.end_date}</p>
              <p><strong>Amount:</strong> ₹{b.amt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default ViewCustomers;
