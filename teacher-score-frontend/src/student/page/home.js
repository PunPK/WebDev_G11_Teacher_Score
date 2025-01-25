import React, { useContext, useEffect, useState, } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import "./home.css";
import Nav_lec from "../../components/navbar.js";

const HomeStudent = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [studentid, setstudentid] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;
  // console.log(user);

  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };


  const fetchSubject = async (userId) => {
    // const studentIds = students.map((student) => student.id).join(",");
    // const subjectUrl = `http://localhost:1337/api/subjects?populate=*&filters[students][id][$in]=${studentIds}`;

    try {
      setLoading(true);
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
      console.error("Error fetching subjects:", e);
      setError("Error fetching subjects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSubject(user.id);
      // setSubjectData(user.subject);
    } else {
      // console.error("User is undefined");
    }
  }, [user]);



  return (
    <>
      <Nav_lec />
      <div class="grid bg-gradient-to-tl from-blue-800 to-cyan-300 h-max ">

        <Card className="mt-16 mx-auto w-72 h-24 shadow-xl bg-white mb-4">

          <Typography className="items-center justify-items-center w-fit mx-auto my-auto">
            <h1 class="mx-auto text-5xl font-sans">รายการวิชา</h1>
          </Typography>

        </Card>

        <div className="flex gap-10 mb-4 mx-28 ">
          <div>
            <Card className="bg-white">
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
          </div>
          <Card>
            <div>
              <input>
              </input>
            </div>
          </Card>
        </div>
        <Card className="mx-28 h-auto bg-white my-2">
          <div class=" grid grid-cols-2 gap-6 mx-6 my-6">
            {subjectData.map((user) => (
              <>
                { }
                <Card onClick={() => navigate(`/topic/${user.documentId}`)} className="group h-full w-full  bg-gradient-to-tr from-blue-50 hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-gradient-to-tr hover:from-blue-700 hover:to-blue-900  hover:shadow-blue-400 "
                  style={{
                    transformStyle: "preserve-3d"
                  }}>
                  <CardBody>
                    <Typography vatiant="h5" className="mb-2 text-2xl font-bold group-hover:text-white">
                      {user.title}
                    </Typography>

                    <Typography className="group-hover:text-white">
                      {user.description}
                    </Typography>

                    < Typography className="group-hover:text-white">
                      จำนวนเรื่อง : {user.topics.lenght === 0 ? "ไม่มีหัวข้อ" : user.topics.lenght}
                    </Typography>

                    <Typography className="group-hover:text-white">
                      สร้างเมื่อ {dayjs(user.createdAt).format("DD / MM / YYYY เวลา HH:mm น.")}
                    </Typography>

                    <Typography className="group-hover:text-white">
                      อัพเดพล่าสุด {dayjs(user.updatedAt).format("DD / MM / YYYY เวลา HH:mm น.")}
                    </Typography>

                  </CardBody>
                </Card>
              </>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default HomeStudent;
