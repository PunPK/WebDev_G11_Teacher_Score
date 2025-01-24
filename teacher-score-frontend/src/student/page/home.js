import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { useNavigate } from "react-router";
import { Spin, Typography, Divider } from "antd";
import SubjectList from "../table/studentSubject.js";
// import NavList from "../components/navbar-lecturer.js";
// import Nav from "../../components/navbar.js";
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
      console.log("API Response for subjects:", response.data.data);
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

  const resultsPerPage = 20;
  const totalResults = subjectData.length;

  const onPageChange = (p) => {
    setPage(p);
  };

  return (
    <div className="App">
      <div className="col-sm-4">
        <h1>
          <a href="/" onClick={onLogout}>
            Logout
          </a>
        </h1>
      </div>

      <body className="App-finance-body">
        <Spin spinning={loading}>
          <Typography.Title>ตาราง</Typography.Title>

          <Divider>บันทึก รายรับ - รายจ่าย</Divider>
          <SubjectList data={subjectData} />
        </Spin>
      </body>
    </div>
  );
};

export default HomeStudent;
