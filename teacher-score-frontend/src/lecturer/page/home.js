import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { useNavigate } from "react-router";
import { useSearchParams } from 'react-router-dom';
import dayjs from "dayjs";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Nav_lec from "../../components/nav_lecturer.js"

const HomeLecturer = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state: ContextState, logout } = useContext(AuthContext);
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [totalTopic, setTotalTopic] = useState(0)
  const { user } = ContextState;
  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const goToTopic = () => {
    navigate("/topic");
  };

  const fetchSubject = async () => {
    setLoading(true)
    try {
      const subjectUrl = "http://localhost:1337/api/subjects?populate=*"
      const response = await ax.get(subjectUrl)
      console.log(response.data.data)
      setSubjectData(response.data.data)

    } catch (e) {
      console.log(e);
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchSubject();
  }, [])

  // on page change, load new sliced data
  // here you would make another server request for new data

  // useEffect(() => {
  //   setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  // }, [page])

  const TABLE_HEAD = ["รายชื่อวิชา", "จำนวนเรื่อง", "อาจารย์ผู้สอน", "วันที่สร้าง", "แก้ไขล่าสุด", "เข้ารายวิชา"]

  return (
    <>
      <Nav_lec />
      <div class="grid bg-gradient-to-tl from-blue-600 to-cyan-400 h-screen mt-0 top-0">

        <Card className="mt-14 col-sm-4 items-center justify-items-center mx-auto w-full h-auto shadow-xl bg-white-100">
          <Typography>
            <h1 class="mx-auto my-5 text-5xl font-sans">Score Anouncer</h1>
          </Typography>

        </Card>




        {/* <!-- Cards --> */}
        <div className="grid grid-cols-4 gap-6 mb-8 mx-28 ">
          <Card title="Total Subjects" className="bg-white-100">

          </Card>
        </div>
        <Card className="mx-28 h-auto bg-white-100">
          <div class=" grid grid-cols-1 gap-4 mx-6 my-5">
            {subjectData.map((user) => (
              <>
                { }
                <Card className="group h-full w-full  bg-gradient-to-tr from-blue-50 hover:drop-shadow-5xl cursor-pointer hover:bg-blue-900 hover:bg-gradient-to-tr hover:from-blue-700 hover:to-blue-900  hover:shadow-blue-400 " onClick={""} herf="/"
                  style={{
                    transformStyle: "preserve-3d"
                  }}>
                  <CardBody>
                    <Typography vatiant="h5" className="mb-2 text-2xl font-bold group-hover:text-white-100">
                      {user.title}
                    </Typography>

                    <Typography className="group-hover:text-white-100">
                      {user.description}
                    </Typography>

                    < Typography className="group-hover:text-white-100">
                      จำนวนเรื่อง : {user.topics.length === 0 ? "ไม่มีหัวข้อ" : user.topics.length}
                    </Typography>

                    <Typography className="group-hover:text-white-100">
                      สร้างเมื่อ {dayjs(user.createdAt).format("DD / MM / YYYY เวลา HH:mm น.")}
                    </Typography>

                    <Typography className="group-hover:text-white-100">
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

export default HomeLecturer;
