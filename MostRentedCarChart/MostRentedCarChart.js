import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function MostRentedCarChart() {
  const [rentalData, setRentalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch rental data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/rentals");

        if (!response.ok) throw new Error("Failed to fetch rental data");

        const data = await response.json();

        // Sort data by rental count descending
        const sorted = data.sort((a, b) => b.rentalCount - a.rentalCount);

        setRentalData(sorted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (rentalData.length === 0) return <p>No rental data available.</p>;

  return (
    <div style={{ width: "80%", margin: "40px auto" }}>
      <h2 style={{ textAlign: "center" }}>🚘 Most Rented Cars</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={rentalData}
          margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={(car) => `${car.make} ${car.model}`}
            tick={{ fontSize: 12 }}
            interval={0}
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="rentalCount" fill="#2e86de" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MostRentedCarChart;
