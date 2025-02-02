import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  PieChartOutlined,
  DisconnectOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

function Navbar({ }) {
  return (
    <div className="navigation-menu">
      <ul>
        <li>
          <Link to="/">
            <HomeOutlined className="menu-icon" />
            <span className="menu-text">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/user">
            <UserOutlined className="menu-icon" />
            <span className="menu-text">User</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
