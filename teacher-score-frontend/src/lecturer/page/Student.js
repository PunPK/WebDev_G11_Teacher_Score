import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { Spin, Typography, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@material-tailwind/react";
import UserTable from "../table/studentList.js";
import Nav_lec from "../../components/navbar.js";

function StudentListPage() {
  const [student, setStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;
  const { id, subject } = useParams();
  const navigate = useNavigate();

  const fetchStudent = async () => {
    try {
      const response = await ax.get(
        `/users?filters[subject_owners][documentId][$eq]=${subject}&populate=*`
      );
      setStudent(response.data);
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

  useEffect(() => {}, [user]);
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Nav_lec />
      <div class="grid bg-gradient-to-tl from-red-400 to-pink-500 h-screen">
        <Card
          onClick={() => navigate("/")}
          className="mt-3 ml-7 w-24 h-12 shadow-xl bg-white mb-6 items-center justify-center group hover:-translate-y-0.5 transition-all duration-200 delay-75 cursor-pointer hover:shadow-blue-900/60 hover:drop-shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <p className="font-extrabold w-20 text-center">Back</p>
        </Card>
        <div className="justify-items-end mb-5 mr-[8.5rem] h-12 mt-2">
          <Card
            onClick={() => navigate(`/subject/addstudent/${id}/${subject}`)}
            className="justify-center items-center flex-none h-12 w-32 group bg-gradient-to-tr from-blue-50/40 to-white hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-white  hover:shadow-blue-800"
          >
            <div className=" w-36 items-center">
              <Typography className="font-semibold text-lg my-auto justify-self-center text-center">
                Add Student
              </Typography>
            </div>
          </Card>
        </div>
        <body className="bg-white rounded-md mx-14 my-4">
          <Spin spinning={isLoading}>
            <Typography.Title>Add Student:</Typography.Title>
            <UserTable data={[student]} />
          </Spin>
        </body>
      </div>
    </>
  );
}

export default StudentListPage;
