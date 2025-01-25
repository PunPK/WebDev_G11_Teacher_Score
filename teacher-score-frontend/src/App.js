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
import TopicStudent from "./student/page/topic.js";
import DataTable from "./student/page/test.js";
import UserPage from "./page/user.js";
import ExcelFetch from "./lecturer/page/exelfetch.js";
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
            <Route path="/topic/:subject" element={<TopicStudent />} />
            <Route path="/test" element={<DataTable />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </BrowserRouter>
      );
    } else if (userRole === "Lecturer") {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/to" element={<TopicLecturer />} />
            <Route path="/test" element={<HomePage />} />
            <Route path="/" element={<HomeLecturer />} />
            <Route path="/" element={<TopicLecturer />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/excelfetch" element={<ExcelFetch />} />

          </Routes >
        </BrowserRouter >
      );
    }
  }
}

export default App;
