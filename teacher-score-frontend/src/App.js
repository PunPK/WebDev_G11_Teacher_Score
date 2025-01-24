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
import TopicLecturer from "./lecturer/page/topic.js";
import HomeStudent from "./student/page/home.js";
import LoginFormTest from "./page/login-test.js";
function App() {
  const { state } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<LoginForm />} /> */}
          <Route path="/" element={<LoginForm />} />
          {/* <Route path="/test" element={<LoginFormTest />} /> */}
        </Routes>
      </BrowserRouter>
    );
  } else {
    const userRole = state.user?.userRole;
    if (userRole === "Student") {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<HomeStudent />} />
          </Routes>
        </BrowserRouter>
      );
    } else if (userRole === "Lecturer") {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<HomeLecturer />} />
            <Route path="/test" element={<HomePage />} />

            <Route path="/topic" element={<TopicLecturer />} />
          </Routes>
        </BrowserRouter>
      );
    }
  }
}

export default App;
