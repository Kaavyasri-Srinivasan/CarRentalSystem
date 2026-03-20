import React, { useState, useEffect } from "react";
import "./AdminCarDetails.css";

function AdminCarDetails() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    regNumber: "",
    pricePerDay: "",
    fuelType: "",
    seats: "",
    available: "Available",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch existing cars on component load
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3002/admin/cardetails");
        if (!response.ok) throw new Error("Failed to fetch car details");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        alert("Error fetching cars from server");
      }
    };

    fetchCars();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!form.make || !form.model || !form.year || !form.regNumber) {
      alert("Please fill all required fields");
      return;
    }

    // Prepare multipart form data
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "available") {
        formData.append("available", value === "Available" ? 1 : 0);
      } else if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch("http://localhost:3002/admin/cardetails", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add car details");
      }

      const result = await response.json();
      setCars((prev) => [...prev, result]); // Add new car to list
      alert("Car details added successfully!");

      // Reset form
      setForm({
        make: "",
        model: "",
        year: "",
        regNumber: "",
        pricePerDay: "",
        fuelType: "",
        seats: "",
        available: "Available",
        image: null
      });
      setImagePreview(null);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="app-container">
      <h2>🚘 Car Rental System - Admin Panel</h2>

      {/* Car Form */}
      <form onSubmit={handleSubmit} className="car-form">
        <label htmlFor="make">Car Make</label>
        <input
          type="text"
          id="make"
          name="make"
          value={form.make}
          onChange={handleChange}
          required
        />

        <label htmlFor="model">Car Model</label>
        <input
          type="text"
          id="model"
          name="model"
          value={form.model}
          onChange={handleChange}
          required
        />

        <label htmlFor="year">Year</label>
        <input
          type="number"
          id="year"
          name="year"
          value={form.year}
          onChange={handleChange}
          required
        />

        <label htmlFor="regNumber">Registration Number</label>
        <input
          type="text"
          id="regNumber"
          name="regNumber"
          value={form.regNumber}
          onChange={handleChange}
          required
        />

        <label htmlFor="pricePerDay">Rental Price per Day (INR)</label>
        <input
          type="number"
          id="pricePerDay"
          name="pricePerDay"
          value={form.pricePerDay}
          onChange={handleChange}
        />

        <label htmlFor="fuelType">Fuel Type</label>
        <select
          id="fuelType"
          name="fuelType"
          value={form.fuelType}
          onChange={handleChange}
          required
        >
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select>

        <label htmlFor="seats">Seating Capacity</label>
        <input
          type="number"
          id="seats"
          name="seats"
          value={form.seats}
          onChange={handleChange}
        />

        <label htmlFor="available">Availability</label>
        <select
          id="available"
          name="available"
          value={form.available}
          onChange={handleChange}
          required
        >
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
        </select>

        <label htmlFor="image">Upload Car Image</label>
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Car Preview"
            style={{ maxWidth: "120px", marginTop: "8px" }}
          />
        )}

        <button type="submit" className="add-btn">
          Add Car
        </button>
      </form>

      {/* Car List */}
      <h3>Available Cars</h3>
      {cars.length === 0 ? (
        <p>No cars added yet.</p>
      ) : (
        <table className="car-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Reg No.</th>
              <th>Price/Day</th>
              <th>Fuel</th>
              <th>Seats</th>
              <th>Status</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.car_id}>
                <td>{car.car_id}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.regNumber}</td>
                <td>₹{car.pricePerDay}</td>
                <td>{car.fuelType}</td>
                <td>{car.seats}</td>
                <td>{car.available ? "Available" : "Booked"}</td>
                <td>
                  {car.image && (
                    <img
                      src={car.image}
                      alt="Car"
                      style={{ maxWidth: "60px" }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminCarDetails;
