import {
  Link,
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./context/Auth.context.js";
// import Login from "./Login/index.js";
// import Dashboard from "./Dashboard/index.js";
import LoginForm from "./page/login.js";
import HomePage from "./page/home.js";

function App() {
  const { state } = useContext(AuthContext);

  if (!state.isLoggedIn) return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
  else
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
