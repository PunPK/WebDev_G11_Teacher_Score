import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { Spin, Typography, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@material-tailwind/react";
import UserTable from "../table/studentList.js";
import Nav_lec from "../../components/navbar.js";
import "../components/table.css";

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

        <body className="bg-white rounded-md mx-14 my-4 custom-table">
          <Spin spinning={isLoading}>
            <Typography.Title>Student All In This Subject:</Typography.Title>
            <UserTable data={[student]} />
          </Spin>
        </body>
      </div>
    </>
  );
}

export default StudentListPage;
