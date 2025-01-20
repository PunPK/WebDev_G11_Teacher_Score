import "./App.css";
import axios from "axios";
import { useState } from "react";
import LoginScreen from "./page/login";
// import EditPage from "./display/EditPage";
import HomePage from "./page/home";
// import UserPage from "./display/User";
// import { CostGraph } from "./display/CostGraph";
// import { Dashboard } from "./display/dashborad";
// import Signup from "./display/Signup";
import Signup from "./page/signup";
import Bar from "./Navbar";
// import { NavLink } from "react-router";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup replace />} />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <HomePage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <HomePage />
                ) : (
                  <LoginScreen onLoginSuccess={handleLoginSuccess} />
                )
              }
            />
          </Routes>
          <div></div>
          <div>
            {isAuthenticated ? (
              <Bar onLogout={handleLogout} isAuthenticated={isAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )}
          </div>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
