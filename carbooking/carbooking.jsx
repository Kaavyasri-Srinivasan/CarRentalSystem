import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./carbooking.css";

function CarBooking() {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [car, setCar] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    days: "",
    start_date: "",
  });
  const [errors, setErrors] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Load logged-in user details from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      setUser(null); // Set user to null if not logged in
    } else {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    // Fetch car details by ID
    const fetchCar = async () => {
      try {
        const res = await fetch(`http://localhost:3002/admin/cardetails/${carId}`);
        if (!res.ok) throw new Error("Failed to fetch car details");
        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCar();
  }, [carId]);

  useEffect(() => {
    if (car && form.days) {
      setTotalAmount(car.pricePerDay * form.days);
    }
  }, [car, form.days]);

  // Form validation
  const validate = () => {
    const errs = {};
    if (!/^[A-Za-z\s]+$/.test(form.name)) errs.name = "Name should contain only letters";
    if (!/^[0-9]{10}$/.test(form.phone)) errs.phone = "Phone should be a 10-digit number";
  if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.email)) errs.email = "Email must end with @gmail.com";
    if (!/^[0-9]+$/.test(form.days) || parseInt(form.days) <= 0) errs.days = "No. of days must be a valid positive number";
    if (!form.start_date) {
      errs.start_date = "Please choose a start date and time";
    } else if (isNaN(new Date(form.start_date).getTime())) {
      errs.start_date = "Start date is not a valid date/time";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent selecting a date earlier than today
    if (name === "start_date") {
      const selectedDate = new Date(value);
      const today = new Date("2025-09-21"); // Set today as 21/9/25
      today.setHours(0, 0, 0, 0); // Reset time to midnight for comparison
      if (selectedDate < today) {
        setErrors((prev) => ({ ...prev, start_date: "Date cannot be earlier than today." }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, start_date: null }));
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // helper: convert datetime-local (YYYY-MM-DDTHH:MM or with seconds) to MySQL DATETIME 'YYYY-MM-DD HH:MM:SS'
      const formatStartDate = (dtLocal) => {
        if (!dtLocal) return null;
        const s = dtLocal.replace("T", " ");
        return s.length === 16 ? `${s}:00` : s;
      };

      const bookingDetails = {
        car_id: carId,
        name: form.name,
        phone_number: form.phone,
        email: form.email,
        start_date: formatStartDate(form.start_date),
        days: parseInt(form.days, 10),
        totalAmount,
      };

      navigate("/summary", { state: { bookingDetails } });
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!car) return <p>Loading car details...</p>;

  const today = new Date("2025-09-21").toISOString().split("T")[0]; // Set today as 21/9/25

  return (
    <div className="booking-container">
      <h2>Car Booking Form</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Start Date & Time:</label>
        <input
          type="datetime-local"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          min={today} // Disable dates earlier than 21/9/25
        />
        {errors.start_date && <p className="error">{errors.start_date}</p>}

        <label>No. of Days for Rent:</label>
        <input
          type="number"
          name="days"
          value={form.days}
          onChange={handleChange}
          placeholder="Enter number of days"
        />
        {errors.days && <p className="error">{errors.days}</p>}

        <p className="price-display">
          Rent per day: ₹{car.pricePerDay}
        </p>

        {totalAmount > 0 && (
          <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
        )}

        <button type="submit" className="book-btn">Book Now</button>
      </form>
    </div>
  );
}

export default CarBooking;
/*
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./carbooking.css";

function CarBooking() {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [car, setCar] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    days: "",
    start_date: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load user
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("Please log in first!");
      navigate("/login");
    } else {
      setUser(storedUser);
    }

    // Fetch car details by ID
    const fetchCar = async () => {
      try {
        const res = await fetch(`http://localhost:3002/admin/cardetails/${carId}`);
        if (!res.ok) throw new Error("Failed to fetch car details");
        const data = await res.json();
        setCar(data);
      } catch (err) {
        alert(err.message);
      }
    };

    fetchCar();
  }, [carId, navigate]);

  const validate = () => {
    const errs = {};
    if (!/^[A-Za-z\s]+$/.test(form.name)) errs.name = "Name should contain only letters";
    if (!/^[0-9]{10}$/.test(form.phone)) errs.phone = "Phone should be a 10-digit number";
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.email))
      errs.email = "Email must end with @gmail.com";
    if (!/^[0-9]+$/.test(form.days) || parseInt(form.days) <= 0)
      errs.days = "No. of days must be a valid positive number";
    if (!form.start_date) {
      errs.start_date = "Please choose a start date and time";
    } else if (isNaN(new Date(form.start_date).getTime())) {
      errs.start_date = "Start date is not a valid date/time";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!car) {
      alert("Car details not loaded yet!");
      return;
    }

    try {
      const formatStartDate = (dtLocal) => {
        if (!dtLocal) return null;
        const s = dtLocal.replace("T", " ");
        return s.length === 16 ? `${s}:00` : s;
      };

      const response = await fetch("http://localhost:3002/user/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          car_id: carId,
          name: form.name,
          phone_number: form.phone,
          email: form.email,
          start_date: formatStartDate(form.start_date),
          days: parseInt(form.days, 10),
        }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Backend did not return JSON. Response: ${text}`);
      }

      if (!response.ok) throw new Error(data.error || "Failed to book car");

      // Navigate to booking summary page
      navigate("/summary", {
        state: {
          booking: {
            ...data,
            make: car.make,
            model: car.model,
            pricePerDay: car.pricePerDay,
          },
        },
      });
    } catch (error) {
      alert(error.message);
    }
  };

  if (!car) return <p>Loading car details...</p>;

  return (
    <div className="booking-container">
      <h2>Car Booking Form</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Start Date & Time:</label>
        <input
          type="datetime-local"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
        />
        {errors.start_date && <p className="error">{errors.start_date}</p>}

        <label>No. of Days for Rent:</label>
        <input
          type="number"
          name="days"
          value={form.days}
          onChange={handleChange}
          placeholder="Enter number of days"
        />
        {errors.days && <p className="error">{errors.days}</p>}

        <p className="price-display">
          Rent per day: ₹{car.pricePerDay}
        </p>

        <p className="price-display">
          Total amount: ₹{totalAmount}
        </p>

        <button type="submit" className="book-btn">Book Now</button>
      </form>
    </div>
  );
}

export default CarBooking;
*/
