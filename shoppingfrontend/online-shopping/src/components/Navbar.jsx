import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/dashboard">Online Shop</Link>
        <div>
          <Link className="btn btn-outline-primary me-2" to="/dashboard">Dashboard</Link>
          <Link className="btn btn-outline-secondary me-2" to="/admin">Admin</Link>
          <Link className="btn btn-outline-success me-2" to="/orders">Orders</Link>
          <button className="btn btn-danger" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
