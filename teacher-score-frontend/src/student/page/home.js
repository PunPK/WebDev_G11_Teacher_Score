import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import Nav_lec from "../../components/navbar.js";

const HomeStudent = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state: ContextState } = useContext(AuthContext);
  const { user } = ContextState;
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(user);
  const fetchSubject = async (userId) => {
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
      // console.log(user);
      // console.log(response.data);
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
    } else {
    }
  }, [user]);

  const handleSearch = () => {
    setSearchTerm(query);
  };

  const filteredSubjects = query
    ? subjectData.filter(
      (subject) =>
        subject.title.toLowerCase().includes(query.toLowerCase()) ||
        subject.subject_id.toLowerCase().includes(query.toLowerCase())
    )
    : subjectData;

  return (
    <>
      <div class=" bg-gradient-to-tl from-blue-800 to-cyan-300 min-h-screen max-h-full top-0 mt-0 z-0">
        <Nav_lec className="z-50" />
        <Card className="mt-10 mx-auto w-72 h-24 shadow-xl bg-white mb-8">
          <Typography className="items-center justify-items-center w-fit mx-auto my-auto">
            <h1 class="mx-auto text-5xl font-sans">รายการวิชา</h1>
          </Typography>
        </Card>

        <div className=" mb-4 mx-28 items-start">
          <div className="flex gap-10  h-fit">
            <Card className="bg-white flex-none h-24 w-64">
              <div class="btn">
                <CardBody>
                  <Typography className="font-bold text-lg">
                    จำนวนวิชาที่เป็นเจ้าของ
                  </Typography>
                  <ul className="ml-4" >
                    {subjectData.length} วิชา
                  </ul>
                </CardBody>
              </div>
            </Card>

            <div className="flex-auto self-end justify-items-end">
              <Card className="flex flex-row items-end gap-2 p-1">
                <input
                  title="ค้นหา"
                  type="text"
                  placeholder="ค้นหาชื่อวิชา"
                  className="flex-1 bg-white h-10 border-2 w-[68rem] border-gray-300 rounded-lg px-2"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                {query && filteredSubjects.length > 0 && (
                  <ul className="absolute top-12 flex-1 w-[68rem] bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-y-auto z-30">
                    {filteredSubjects.map((subject) => (
                      <li
                        key={subject.subject_id}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => setQuery(subject.title)}
                      >
                        {`[${subject.subject_id}] : ${subject.title}`}
                      </li>
                    ))}
                  </ul>
                )}
                <Card
                  onClick={handleSearch}
                  className="group flex-none shadow-md mr-2 shadow-black self-center items-center justify-items-center rounded-bl-lg hover:bg-gradient-to-tr bg-gradient-to-tr from-light-blue-700 to-blue-400 text-white hover:to-blue-800 hover:from-cyan-600 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer w-24 h-10 flex justify-center"
                >
                  <span className="font-semibold">ค้นหา</span>
                </Card>
              </Card>
            </div>

          </div>
        </div>

        <Card className="mx-28 h-fit bg-white my-2">
          {filteredSubjects.length > 0 ?
            <div class=" grid grid-cols-2 gap-6 mx-6 my-6">
              {filteredSubjects.map((subject) => (
                <Card
                  onClick={() =>
                    navigate(
                      `/topic/${subject.title}/${user.username}/${subject.documentId}`
                    )
                  }
                  className="group h-full w-full  bg-gradient-to-tr from-blue-50 hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-gradient-to-tr hover:from-blue-700 hover:to-blue-900  hover:shadow-blue-400 "
                >
                  <CardBody>
                    <Typography
                      vatiant="h5"
                      className="mb-2 text-2xl font-bold group-hover:text-white"
                    >
                      ( {subject.subject_id} ) - {subject.title}
                    </Typography>

                    <Typography className="group-hover:text-white">
                      {subject.description}
                    </Typography>

                    <Typography className="group-hover:text-white">
                      จำนวนเรื่อง :{" "}
                      {subject.topics.length === 0
                        ? "ไม่มีหัวข้อ"
                        : subject.topics.length}
                    </Typography>

                    <Typography className="group-hover:text-white">
                      สร้างเมื่อ{" "}
                      {dayjs(subject.createdAt).format(
                        "DD / MM / YYYY เวลา HH:mm น."
                      )}
                    </Typography>

                    <Typography className="group-hover:text-white">
                      อัพเดทล่าสุด{" "}
                      {dayjs(subject.updatedAt).format(
                        "DD / MM / YYYY เวลา HH:mm น."
                      )}
                    </Typography>
                  </CardBody>
                </Card>
              ))}
            </div> :
            <div className="mx-24 my-28 items-center justify-items-center">
              <Typography className="text-black text-5xl font-medium">
                ไม่พบวิชา
              </Typography>
            </div>}
        </Card>
      </div>
    </>
  );
};

export default HomeStudent;
