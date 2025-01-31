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
      console.log(user)
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
  
  const filteredSubjects = subjectData.filter((subject) =>
    subject.title.toLowerCase().includes(query.toLowerCase()) ||
    subject.subject_id.toLowerCase().includes(query.toLowerCase())
  );


  return (
    <>
      <div class=" bg-gradient-to-tl from-blue-800 to-cyan-300 min-h-screen max-h-full top-0 mt-0 z-0">
        <Nav_lec className="z-50" />
        <Card className="mt-10 mx-auto w-72 h-24 shadow-xl bg-white mb-8">

          <Typography className="items-center justify-items-center w-fit mx-auto my-auto">
            <h1 class="mx-auto text-5xl font-sans">รายการวิชา</h1>
          </Typography>

        </Card>

        <div className="flex gap-10 mb-4 mx-28 ">
          <div>
            <Card className="bg-white">
              <CardBody>
                <Typography className="font-bold text-lg">
                  จำนวนวิชาที่เป็นเจ้าของ
                </Typography>
                <Typography className="ml-4">
                  {subjectData.lenght} วิชา
                </Typography>
              </CardBody>
            </Card>
          </div>
          <Card>
            <div>
              <input title="ค้นหา" type="text" placeholder="ค้นหา" className="bg-white h-10 w-64 border-2 border-gray-300 rounded-lg" onChange={(e) => setQuery(e.target.value)}>
              </input>
            </div>
          </Card>
        </div>
        <Card className="mx-28 h-fit bg-white my-2">
          <div className="grid grid-cols-2 gap-6 mx-6 my-6">
            {filteredSubjects.map((subject) => (
              <Card
                key={subject.id}
                onClick={() => navigate(`/topic/${subject.title}/${user.username}/${subject.documentId}`)}
                className="group h-full w-full bg-gradient-to-tr from-blue-50 hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer hover:bg-gradient-to-tr hover:from-blue-700 hover:to-blue-900 hover:shadow-blue-400"
              >
                <CardBody>
                  <Typography variant="h5" className="mb-2 text-2xl font-bold group-hover:text-white">
                    ( {subject.subject_id} ) - {subject.title}
                  </Typography>

                  <Typography className="group-hover:text-white">
                    {subject.description}
                  </Typography>

                  <Typography className="group-hover:text-white">
                    จำนวนเรื่อง : {subject.topics.length === 0 ? "ไม่มีหัวข้อ" : subject.topics.length}
                  </Typography>

                  <Typography className="group-hover:text-white">
                    สร้างเมื่อ {dayjs(subject.createdAt).format("DD / MM / YYYY เวลา HH:mm น.")}
                  </Typography>

                  <Typography className="group-hover:text-white">
                    อัพเดทล่าสุด {dayjs(subject.updatedAt).format("DD / MM / YYYY เวลา HH:mm น.")}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default HomeStudent;
