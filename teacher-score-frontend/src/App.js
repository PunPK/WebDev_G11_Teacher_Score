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
import LoginForm from "./page/login.js";
import HomePage from "./page/home.js";
import HomeLecturer from "./lecturer/page/home.js";
import TopicLecturer from "./lecturer/page/topic.js";
import HomeStudent from "./student/page/home.js";
import TopicStudent from "./student/page/topic.js";
import UserPage from "./page/user.js";
import EditSubject from "./lecturer/page/editSubject.js";
import ExcelFetch from "./lecturer/page/excelfetch.js";
import CreateTopic from "./lecturer/page/addTopic.js";
function App() {
  const { state } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
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
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </BrowserRouter>
      );
    } else if (userRole === "Lecturer") {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/edit/:subject" element={<EditSubject />} />
            <Route path="/topic/:subject" element={<TopicLecturer />} />
            <Route path="/topic/create/:subject" element={<CreateTopic />} />
            <Route path="/" element={<HomeLecturer />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/excelfetch" element={<ExcelFetch />} />
          </Routes>
        </BrowserRouter>
      );
    }
  }
}

export default App;
