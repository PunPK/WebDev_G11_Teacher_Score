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
        <Card className="mt-16 mx-auto w-72 h-24 shadow-xl bg-white mb-4">
          <Typography className="items-center justify-items-center w-fit mx-auto my-auto">
            <h1 class="mx-auto text-5xl font-sans">รายการวิชา</h1>
          </Typography>
        </Card>

        <div className="flex gap-10 mb-4 mx-28 ">

          <Card className="bg-white flex-initial">
            <div>
              <CardBody>
                <Typography className="font-bold text-lg">
                  จำนวนวิชาที่เป็นเจ้าของ
                </Typography>
                <Typography className="ml-4">
                  {subjectData.lenght} วิชา
                </Typography>
              </CardBody>
            </div>
          </Card>
          <Card onClick={() => navigate("")} className="justify-between flex-none h-10 w-36 group bg-white hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-gradient-to-tr hover:from-red-700 hover:to-pink-900  hover:shadow-red-400">
            <div className="h-10 w-36 items-center">
              <CardBody className="justify-between">
                <Typography className="font-semibold text-md group-hover:text-white text-center">
                  Add Subject
                </Typography>
              </CardBody>
            </div>
          </Card>
        </div>

        <Card className="mx-28 h-fit bg-white my-2 ">
          <div class=" grid grid-cols-2 gap-4 mx-6 my-5 g">
            {subjectData.map((user) => (
              <div>

                <>

                  <Card
                    onClick={() => navigate(`/topic/${user.documentId}`)}
                    className="z-10 group h-full w-full  bg-gradient-to-tr from-blue-50 hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-gradient-to-tr hover:from-red-700 hover:to-pink-900  hover:shadow-red-400 "
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

                </>
                <>
                  <Card className="group hover:ring-2 z-20 hover:bg-gradient-to-t bg-white hover:to-orange-50 hover:from-red-400 hover:ring-inherit hover:ring-offset-2">
                    <button onClick={() => navigate("/edit")} className="group-hover:text-white ">Edit</button>
                  </Card>
                </>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default HomeLecturer;
