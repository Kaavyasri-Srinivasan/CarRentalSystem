import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [count, setCount] = useState(0);
  const [carsMap, setCarsMap] = useState({});

  useEffect(() => {
    // don't auto-load bookings without a search — show empty state
    setLoading(false);
  }, []);

  const fetchBookings = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:3002/user/bookings", { params });
      setBookings(res.data.bookings || []);
      setCount(res.data.count || 0);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.response?.data?.error || "Failed to fetch bookings.");
      setBookings([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cars map so we can compute accurate totals for bookings
  useEffect(() => {
    let mounted = true;
    const fetchCars = async () => {
      try {
        const res = await axios.get('http://localhost:3002/admin/cardetails');
        const list = res.data || [];
        const map = {};
        list.forEach(c => {
          const id = String(c.car_id || c.id);
          map[id] = c;
        });
        if (mounted) setCarsMap(map);
      } catch (err) {
        console.error('Error fetching cars for totals:', err);
      }
    };
    fetchCars();
    return () => { mounted = false; };
  }, []);

  if (loading) return <p style={{ color: "white" }}>Loading bookings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        padding: "20px",
        backgroundImage: "url('/bookb.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.2)",
          zIndex: 0,
        }}
      ></div>

      {/* Main container with flex */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
          minHeight: "600px",
        }}
      >
        {/* Left search box */}
        <div
          style={{
            backgroundColor: "white",
            color: "#000",
            borderRadius: "12px",
            padding: "24px",
            minWidth: "320px",
            minHeight: "500px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              color: "blue",
              fontSize: "2.5rem",
              marginBottom: "24px",
              backgroundColor: "transparent",
              padding: 0,
              borderRadius: 0,
              display: "block",
            }}
          >
            View Bookings
          </h2>

          <div style={{ marginBottom: 12 /* reduced margin-bottom */ }}>
            <label
              style={{
                display: "block",
                marginBottom: 8, // reduced margin-bottom
                fontSize: "1.2rem", // smaller font size
              }}
            >
              Email:
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  marginLeft: 8,
                  fontSize: "0.9rem", // smaller font size
                  width: "100%",
                  padding: "4px 6px", // less padding vertically
                  height: "28px", // fixed smaller height
                  boxSizing: "border-box",
                }}
                placeholder="Enter email"
                
              />
              <br />
              <br />
              </label>
            <label
              style={{
                display: "block",
                marginBottom: 8, // reduced margin-bottom
                fontSize: "1.2rem",
              }}
            >
              Phone:
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  marginLeft: 8,
                  fontSize: "0.9rem",
                  width: "100%",
                  padding: "4px 6px",
                  height: "28px",
                  boxSizing: "border-box",
                }}
                placeholder="Enter phone"
              />
            </label>
            <button
              onClick={() =>
                fetchBookings({
                  email: email || undefined,
                  phone_number: phone || undefined,
                })
              }
              style={{
                marginTop: "8px", // reduced margin-top
                fontSize: "1rem", // slightly smaller font size
                padding: "12px 24px",
                cursor: "pointer",
                backgroundColor: "blue",
                color: "white",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Search
            </button>
            <div style={{ marginTop: "8px", fontSize: "1rem" }}>
              {count > 0 && `Found ${count} booking${count > 1 ? "s" : ""}`}
            </div>
          </div>

          {/* No bookings message inside left box */}
          {bookings.length === 0 && (
            <p style={{ marginTop: "auto", fontSize: "1.2rem", color: "#444" }}>
              No bookings found. Enter an email or phone and click Search.
            </p>
          )}
        </div>

        {/* Right bookings list */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.booking_id}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "#000",
                  padding: "16px",
                  marginBottom: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: "grid",
                  gridTemplateColumns: "150px 1fr",
                  rowGap: "8px",
                  columnGap: "16px",
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: "bold" }}>Booking ID:</div>
                <div>{booking.booking_id}</div>

                <div style={{ fontWeight: "bold" }}>Car:</div>
                <div>{`${booking.make || ""} ${booking.model || ""} ${booking.regNumber || ""}`.trim()}</div>

                <div style={{ fontWeight: "bold" }}>Name:</div>
                <div>{booking.name}</div>

                <div style={{ fontWeight: "bold" }}>Phone:</div>
                <div>{booking.phone_number}</div>

                <div style={{ fontWeight: "bold" }}>Email:</div>
                <div>{booking.email}</div>

                <div style={{ fontWeight: "bold" }}>Start:</div>
                <div>{booking.start_date ? new Date(booking.start_date).toLocaleString() : ""}</div>

                <div style={{ fontWeight: "bold" }}>End:</div>
                <div>{booking.end_date ? new Date(booking.end_date).toLocaleString() : ""}</div>

                <div style={{ fontWeight: "bold" }}>Days:</div>
                <div>{booking.days}</div>

                <div style={{ fontWeight: "bold" }}>Total:</div>
                <div>
                  {(() => {
                    const daysNum = Number(booking.days) || 0;
                    // prefer car price from carsMap, fall back to booking.pricePerDay, then to 4500
                    const carIdKey = String(booking.car_id || booking.carId || booking.carID || '');
                    const carObj = carsMap[carIdKey];
                    const priceFromCar = carObj ? Number(carObj.pricePerDay || carObj.price || 0) : 0;
                    const pricePerDay = priceFromCar || (booking.pricePerDay ? Number(booking.pricePerDay) : 4500);
                    const total = pricePerDay * daysNum;
                    return `₹${total.toLocaleString()}`;
                  })()}
                </div>

                <div style={{ fontWeight: "bold" }}>Booked At:</div>
                <div>{booking.booking_time ? new Date(booking.booking_time).toLocaleString() : ""}</div>
              </div>
            ))
          ) : (
            <p style={{ color: "white", marginTop: "20px" }}>
              No bookings to display. Please enter details and click Search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewBookingsPage;
