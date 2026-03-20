import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingSummary.css";

const BookingSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { bookingDetails } = state || {};
  const [bookingId, setBookingId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [wantDriver, setWantDriver] = useState(null); // null = unanswered, true/false = choice
  const [endDate, setEndDate] = useState(null);
  const [showUpiForm, setShowUpiForm] = useState(false);
  const [upiid, setUpiid] = useState("");
  const [upipin, setUpipin] = useState("");
  const [upiError, setUpiError] = useState("");

  useEffect(() => {
    if (bookingDetails) {
      const startDate = new Date(bookingDetails.start_date);
      const calculatedEndDate = new Date(startDate);
      calculatedEndDate.setDate(startDate.getDate() + bookingDetails.days);
      setEndDate(calculatedEndDate.toLocaleString());
    }
  }, [bookingDetails]);

  if (!bookingDetails) {
    navigate("/welcome");
    return null;
  }

  // Create booking in DB before payment
  const createBooking = async () => {
    try {
      const res = await fetch('http://localhost:3002/user/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          car_id: bookingDetails.car_id,
          name: bookingDetails.name,
          phone_number: bookingDetails.phone_number,
          email: bookingDetails.email,
          start_date: bookingDetails.start_date,
          days: bookingDetails.days,
          amt: bookingDetails.totalAmount
        })
      });
      const data = await res.json();
      if (res.ok && data.booking_id) {
        setBookingId(data.booking_id);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handlePayNow = async () => {
    const created = await createBooking();
    if (created) {
      setShowConfirmation(true);
    } else {
      alert('Sorry no availability of this car on that date');
    }
  };

  const handleConfirmPayment = (confirm) => {
    setShowConfirmation(false);
    if (confirm) {
      setShowUpiForm(true);
    } else {
      navigate("/welcome");
    }
  };
  // UPI validation handler
  const handleUpiSubmit = async (e) => {
    e.preventDefault();
    setUpiError("");
    try {
      console.log("Sending UPI ID:", upiid, "PIN:", upipin); // Debug log
      // Call API to validate UPI ID and PIN
      const res = await fetch(`http://localhost:3002/api/upi/check?upiid=${encodeURIComponent(upiid)}&pin=${encodeURIComponent(upipin)}`);
      const data = await res.json();
      console.log("API response:", data); // Debug log
      if (res.ok && data.valid) {
        // Store amount in bookings table (update amt if needed)
        if (bookingId) {
          try {
            await fetch('http://localhost:3002/api/bookings/amt', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                booking_id: bookingId,
                amt: bookingDetails.totalAmount
              })
            });
          } catch (err) {
            // Optionally handle error
          }
        }
        setPaymentDone(true);
        setShowUpiForm(false);
      } else {
        setUpiError("Invalid UPI ID or PIN. Please try again.");
      }
    } catch (err) {
      setUpiError("Error validating UPI. Please try again.");
    }
  };

  const handleDone = () => {
    navigate("/welcome");
  };

  return (
    <div className="booking-summary-container">
      <h2>Booking Summary</h2>
      <div className="booking-summary-box">
        <p><strong>Car ID:</strong> {bookingDetails.car_id}</p>
        <p><strong>Name:</strong> {bookingDetails.name}</p>
        <p><strong>Phone:</strong> {bookingDetails.phone_number}</p>
        <p><strong>Email:</strong> {bookingDetails.email}</p>
        <p><strong>Start Date:</strong> {bookingDetails.start_date}</p>
        <p><strong>Days:</strong> {bookingDetails.days}</p>
        {endDate && <p><strong>End Date:</strong> {endDate}</p>}
        <p><strong>Total Amount:</strong> ₹{bookingDetails.totalAmount}</p>
        {!paymentDone && !showUpiForm && (
          <button className="pay-now-btn" onClick={handlePayNow}>Pay Now</button>
        )}
        {paymentDone && (
          <>
            <p style={{ color: "green", fontWeight: "bold" }}>Payment Successful!</p>
            {/* Driver choice prompt shown after payment */}
            {wantDriver === null ? (
              <div style={{ marginTop: '12px' }}>
                <p>Want Driver or not?</p>
                <button className="confirm-btn" onClick={() => setWantDriver(true)} style={{ marginRight: '8px' }}>Yes</button>
                <button className="cancel-btn" onClick={() => setWantDriver(false)}>No</button>
              </div>
            ) : (
              <>
                <p style={{ marginTop: '8px' }}><strong>Driver choice:</strong> {wantDriver ? 'Yes' : 'No'}</p>
                <button className="done-btn" onClick={handleDone}>Done</button>
              </>
            )}
          </>
        )}
      </div>

      {showConfirmation && (
        <div className="confirmation-box">
          <p>Are you sure you want to pay?</p>
          <button className="confirm-btn" onClick={() => handleConfirmPayment(true)}>Yes</button>
          <button className="cancel-btn" onClick={() => handleConfirmPayment(false)}>No</button>
        </div>
      )}
      {showUpiForm && (
        <div className="confirmation-box">
          <form onSubmit={handleUpiSubmit}>
            <p>Enter your UPI ID and PIN:</p>
            <input
              type="text"
              placeholder="UPI ID"
              value={upiid}
              onChange={e => setUpiid(e.target.value)}
              required
              style={{ marginBottom: "10px", width: "80%" }}
            />
            <br />
            <input
              type="password"
              placeholder="UPI PIN"
              value={upipin}
              onChange={e => setUpipin(e.target.value)}
              required
              maxLength={6}
              style={{ marginBottom: "10px", width: "80%" }}
            />
            <br />
            <button className="confirm-btn" type="submit">Submit</button>
            {upiError && <p style={{ color: "red" }}>{upiError}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
