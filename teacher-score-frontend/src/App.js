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
import HomeLecturer from "./lecturer/page/home.js";
import HomeStudent from "./student/page/home.js";

function App() {
  const { state } = useContext(AuthContext);

  if (!state.isLoggedIn)
    return (
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<LoginForm />} /> */}
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    );
  else
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home-lecturer" element={<HomeLecturer />} />
          <Route path="/home-student" element={<HomeStudent />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
