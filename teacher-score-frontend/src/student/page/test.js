import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { useNavigate } from "react-router";
import { Spin } from "antd";
import SubjectList from "../table/studentSubject.js";
import "./home.css";

const HomeStudent = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [studentid, setstudentid] = useState();
  const navigate = useNavigate();
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;

  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const fetchStudent = async (user) => {
    setLoading(true);
    try {
      const studentUrl = `http://localhost:1337/api/students?populate=*&filters[users_permissions_user][id][$eq]=${user.id}`;
      const response = await ax.get(studentUrl);
      fetchSubject(response.data.data);
    } catch (e) {
      console.error("Error fetching student data:", e);
      setError("Error fetching student data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubject = async (students) => {
    const studentIds = students.map((student) => student.id).join(",");
    const subjectUrl = `http://localhost:1337/api/subjects?populate=*&filters[students][id][$in]=${studentIds}`;

    try {
      setLoading(true);
      const response = await ax.get(subjectUrl);
      setSubjectData(response.data.data);
    } catch (e) {
      console.error("Error fetching subjects:", e);
      setError("Error fetching subjects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStudent(user);
    } else {
      console.error("User is undefined");
    }
  }, [user]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // return (
  //   // <div className="App">
  //   //   <Box sx={{ padding: 3 }}>
  //   //     <Typography variant="h4" gutterBottom>
  //   //       ยินดีต้อนรับ {user?.username}
  //   //     </Typography>
  //   //     <Button variant="outlined" color="primary" onClick={onLogout}>
  //   //       Logout
  //   //     </Button>
  //   //     <Spin spinning={loading}>
  //   //       <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
  //   //         ตารางวิชา
  //   //       </Typography>
  //   //       <SubjectList data={subjectData} />
  //   //     </Spin>
  //   //   </Box>
  //   // </div>
  // );
};

export default HomeStudent;
