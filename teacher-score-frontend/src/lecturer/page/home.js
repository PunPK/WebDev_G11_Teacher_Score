import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Nav_lec from "../../components/navbar.js";

const HomeLecturer = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [subjectDataCount, setSubjectDataCount] = useState(0);
  const navigate = useNavigate();
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;
  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const goToTopic = () => {
    navigate("/topic");
  };

  const fetchSubject = async (userId) => {
    try {
      const response = await ax.get("http://localhost:1337/api/subjects", {
        params: {
          populate: "*",
          filters: {
            users_owner: {
              id: {
                $eq: userId,
              },
            },
          },
        },
      });
      console.log(response.data);
      setSubjectData(response.data);
      setSubjectDataCount(response.data.length);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  useEffect(() => {
    if (user) {
      fetchSubject(user.id);
    } else {
    }
  }, [user]);

  return (
    <>
      <Nav_lec />
      <div class="grid bg-gradient-to-tr from-red-400 to-pink-500 min-h-screen max-h-full top-0 mt-0 z-10">
        <Card className="mt-8 mx-auto w-72 h-24 shadow-xl bg-white mb-1">
          <Typography className="items-center justify-items-center w-fit mx-auto my-auto">
            <h1 class="mx-auto text-5xl font-sans">รายการวิชา</h1>
          </Typography>
        </Card>

        <div className="flex gap-10 mx-28 items-end h-fit">

          <Card className="bg-white flex-none justify-between h-24 w-64 mt-4">
            <div>
              <CardBody>
                <Typography className="font-bold text-lg">
                  จำนวนวิชาที่เป็นเจ้าของ
                </Typography>
                <Typography className="ml-4">
                  {subjectDataCount} วิชา
                </Typography>
              </CardBody>
            </div>
          </Card>
          <div className="bg-transparent flex-1 justify-between"></div>
          <div className="items-end">
            <Card
              onClick={() => navigate("/subject/create")}
              className="justify-center mt-14 items-end flex-none h-12 w-36 group bg-white hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-white  hover:shadow-teal-800"
            >
              <div className=" w-36 items-center">
                <Typography className="font-semibold text-md  my-auto justify-self-center text-center">
                  Add Subject
                </Typography>
              </div>
            </Card>
          </div>
        </div>

        <Card className="mx-28 min-h-fit h-fit bg-white mb-2 ">
          <div class=" grid grid-cols-2 gap-4 mx-6 mt-5 mb-12">
            {subjectData.map((user) => (
              <div>
                <Card className="bg-white shadow-xl shadow-red-900/20  h-72">
                  <Card
                    onClick={() => navigate(`/topic/${user.id}`)}
                    className="z-20 group mt-3  mx-3 h-46 w-auto rounded-t-lg bg-gradient-to-tl from-red-50 hover:-translate-y-2 transition-all duration-200 delay-75 cursor-pointer  hover:bg-gradient-to-tr hover:from-red-700 hover:to-pink-900 hover:drop-shadow-2xl hover:shadow-red-400 "
                  >
                    <CardBody>
                      <Typography
                        vatiant="h5"
                        className="mb-2 text-2xl font-bold group-hover:text-white"
                      >
                        {user.title}
                      </Typography>

                      <Typography className="group-hover:text-white">
                        {user.description}
                      </Typography>

                      <Typography className="group-hover:text-white">
                        จำนวนเรื่อง :{" "}
                        {user.topics.lenght === 0
                          ? "ไม่มีหัวข้อ"
                          : user.topics.lenght}
                      </Typography>

                      <Typography className="group-hover:text-white">
                        สร้างเมื่อ{" "}
                        {dayjs(user.createdAt).format(
                          "DD / MM / YYYY เวลา HH:mm น."
                        )}
                      </Typography>

                      <Typography className="group-hover:text-white">
                        อัพเดพล่าสุด{" "}
                        {dayjs(user.updatedAt).format(
                          "DD / MM / YYYY เวลา HH:mm น."
                        )}
                      </Typography>
                    </CardBody>
                  </Card>
                  <div className="mt-3 mx-2">
                    <div className="grid grid-cols-2 h-14 gap-2">
                      <Card
                        onClick={() =>
                          navigate(
                            `/subject/student/${user.id}/${user.documentId}`
                          )
                        }
                        className="group shadow-md shadow-black items-center justify-items-center rounded-bl-lg hover:bg-gradient-to-tr bg-gradient-to-tr from-light-blue-700 to-blue-400  text-white hover:to-blue-800 hover:from-cyan-600 hover:translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer">
                        <span
                          className="justify-self-center my-auto font-semibold"
                        >
                          Add Student
                        </span>
                      </Card>
                      <Card
                        onClick={() =>
                          navigate(`/subject/edit/${user.documentId}`)
                        }
                        className="group items-center justify-items-center rounded-br-lg hover:bg-gradient-to-tl bg-gradient-to-tr from-red-700 to-red-400 bg-red-600 text-white hover:to-pink-500 hover:from-red-400 hover:translate-y-0.5 hover:translate-x-0.5 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer">
                        <span
                          className="justify-self-center my-auto font-semibold"
                        >
                          Edit
                        </span>
                      </Card>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default HomeLecturer;
