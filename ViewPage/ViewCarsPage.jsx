import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewCarsPage.css";

const ViewCarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:3002/admin/cardetails");
        if (!res.ok) throw new Error("Failed to fetch car data");
        const data = await res.json();
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="car-list-container">
      <h2 className="page-title">🚗 Available Cars</h2>
      <div className="car-grid">
        {cars.map((car) => (
          <div
            key={car.car_id}
            className={`car-card ${car.available ? "" : "not-available"}`}
          >
            {car.image ? (
              <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="car-image"
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <div className="car-info">
              <h3>{car.make} {car.model}</h3>
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Fuel:</strong> {car.fuelType}</p>
              <p><strong>Seats:</strong> {car.seats}</p>
              <p><strong>Price/Day:</strong> ₹{car.pricePerDay}</p>
              <p className={`status ${car.available ? "available" : "not-available"}`}>
                {car.available ? "Available" : "Not Available"}
              </p>
              {car.available && (
                <button
                  className="select-button"
                  onClick={() => navigate(`/book/${car.car_id}`)}
                >
                  Select
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCarsPage;
