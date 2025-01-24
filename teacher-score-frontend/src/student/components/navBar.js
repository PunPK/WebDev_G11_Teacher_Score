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

function Navbar({}) {
  //   const { logout } = useContext(AuthContext);
  //   const navigate = useNavigate();
  //   const onLogout = (e) => {
  //     e.preventDefault();
  //     console.log("Logging out...");
  //     navigate("/login");
  //     logout();
  //   };
  //   const handleLogout = (e) => {
  //     e.preventDefault();
  //     if (isAuthenticated) {
  //     }
  //   };

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
        {/* <li>
          Allow logout only if the user is authenticated
          {isAuthenticated && (
            <a href="/logout" onClick={handleLogout}>
              <DisconnectOutlined className="menu-icon" />
              <span className="menu-text">Logout</span>
            </a>
          )}
        </li> */}
      </ul>
    </div>
  );
}

export default Navbar;
