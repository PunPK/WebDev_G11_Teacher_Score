import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { Spin, Typography, } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@material-tailwind/react";
import UserTable from "../table/studentList.js";
import Nav_lec from "../../components/navbar.js";
import "../components/table.css";

function StudentListPage() {
  const [student, setStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state: ContextState, } = useContext(AuthContext);
  const { user } = ContextState;
  const { subject } = useParams();
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

  useEffect(() => { }, [user]);
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div class="bg-gradient-to-tl from-teal-800 to-cyan-300  min-h-screen max-h-full top-0  z-0">
        <Nav_lec />
        <Card
          onClick={() => navigate(-1)}
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

        <Card className=" mx-auto min-w-38 max-w-[28rem] h-24 shadow-xl bg-white">
          <Typography className="font-bold items-center justify-items-center w-fit mx-auto my-auto text-3xl font-sans">
            นักศึกษาในรายวิชา
          </Typography>
        </Card>

        <Card className="bg-white rounded-md mx-14 my-4 custom-table">
          <Spin spinning={isLoading}>
            <UserTable data={[student]} />
          </Spin>
        </Card>
      </div>
    </>
  );
}

export default StudentListPage;
