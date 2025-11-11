import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Dashboard = ({ onLogout }) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    totalStock: 0,
    categories: [],
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching dashboard data:", err));
  }, []);

  return (
    <div>
      <Navbar onLogout={onLogout} />
      <div className="container">
        <h2 className="mb-4">Dashboard</h2>
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card shadow p-3 text-center">
              <h5>Total Products</h5>
              <p className="fs-4">{stats.totalProducts}</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card shadow p-3 text-center">
              <h5>Total Value</h5>
              <p className="fs-4">₹{stats.totalValue}</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card shadow p-3 text-center">
              <h5>Total Stock</h5>
              <p className="fs-4">{stats.totalStock}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h4>Categories</h4>
          <ul className="list-group">
            {stats.categories.map((c) => (
              <li key={c.id} className="list-group-item">{c.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

