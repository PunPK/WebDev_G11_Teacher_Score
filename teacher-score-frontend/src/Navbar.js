import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  PieChartOutlined,
  DisconnectOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      console.log("Logging out...");
      onLogout();
      navigate("/login");
    }
  };

  return (
    <div className="navigation-menu">
      <ul>
        <li>
          <Link to="/">
            <HomeOutlined className="menu-icon" />
            <span className="menu-text">Home</span>
          </Link>
        </li>
        {/* <li>
          <Link to="/dashboard">
            <PieChartOutlined className="menu-icon" />
            <span className="menu-text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/costgraph">
            <LineChartOutlined className="menu-icon" />
            <span className="menu-text">Cost Graph</span>
          </Link>
        </li>
        <li>
          <Link to="/Editdata">
            <DollarOutlined className="menu-icon" />
            <span className="menu-text">Add/Edit/Delete</span>
          </Link>
        </li>
        <li>
          <Link to="/user">
            <UserOutlined className="menu-icon" />
            <span className="menu-text">User</span>
          </Link>
        </li> */}
        <li>
          {/* Allow logout only if the user is authenticated */}
          {isAuthenticated && (
            <a href="/logout" onClick={handleLogout}>
              <DisconnectOutlined className="menu-icon" />
              <span className="menu-text">Logout</span>
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
