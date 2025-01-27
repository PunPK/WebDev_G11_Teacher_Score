// import Bar from "../components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { Spin, Typography, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
// import UserTable from "./UserTable";
// import UserTable from "../../page/UserTable.js";
import UserTable from "../table/studentList.js";
// import "./user.css";
import Nav_lec from "../../components/navbar.js";

function StudentListPage() {
  const [student, setStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;
  const { id, subject } = useParams();
  const navigate = useNavigate();
  console.log(user);
  console.log(subject);

  const openModal = (record) => {
    setEditData(record);
    setIsModalShow(true);
  };

  const closeModal = () => {
    setIsModalShow(false);
    setEditData(null);
  };

  const fetchStudent = async () => {
    try {
      const response = await ax.get(
        `/users?filters[subject_owners][documentId][$eq]=${subject}&populate=*`
      );
      // const mappedStudents = response.data.map((response) => ({
      //   key: response.id,
      //   username: response.username,
      //   email: response.email,
      //   provider: response.provider,
      //   documentId: response.documentId,
      // }));
      console.log(response.data);
      setStudent(response.data);
      // setSubjectDataCount(response.data.length);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  useEffect(() => {
    if (user) {
      fetchStudent();
    } else {
    }
  }, [user]);

  useEffect(() => {
    console.log(user);
  }, [user]);
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Nav_lec />
      <div class="grid bg-gradient-to-tl from-red-400 to-pink-500 h-screen">
        <body className="bg-white rounded-md mx-14 my-4">
          <Button
            onClick={() => navigate(`/subject/addstudent/${id}/${subject}`)}
            className="justify-self-center my-auto font-semibold"
          >
            Add Student
          </Button>
          <Spin spinning={isLoading}>
            {/* <UserOutlined className="custom-icon" /> */}
            <Typography.Title>Add Student:</Typography.Title>
            <UserTable data={[student]} />
          </Spin>
          {/* <Button
          type="primary"
          htmlType="submit"
          onClick={handleChangedPassword}
        >
          Changed Password
        </Button> */}
        </body>
      </div>
    </>
  );
}

export default StudentListPage;
