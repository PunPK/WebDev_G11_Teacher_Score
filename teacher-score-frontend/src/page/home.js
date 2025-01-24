import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth.context.js";
import ax from "../conf/ax.js";
import { useNavigate } from "react-router";

import dayjs from "dayjs";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Button, Spinner } from "flowbite-react";
import Nav_lec from "../components/nav_lecturer.js";

const HomeLecturer = () => {
  const [subjectData, setSubjectData] = useState([]);
  const navigate = useNavigate();
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;
  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const fetchSubject = async () => {
    try {
      const subjectUrl = "http://localhost:1337/api/subjects?populate=*"
      const response = await ax.get(subjectUrl)
      console.log(response.data.data)
      setSubjectData(response.data.data)

    } catch (e) {
      console.log(e);
    }
    finally {
    }
  };

  const fetchTopic = async () => {
    try {
      const subjectUrl = "http://localhost:1337/api/subjects?populate=*"
      const response = await ax.get(subjectUrl)
      setSubjectData(response.data.data)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchSubject();
  })

  // on page change, load new sliced data
  // here you would make another server request for new data

  // useEffect(() => {
  //   setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  // }, [page])

  return (

    <div class="bg-gradient-to-tl from-cyan-50 h-screen">
      <Nav_lec />

      <div className="col-sm-8 row-span-1">
        <h1>Hello lecturer {user.username}</h1>
      </div>


      <button href="/" onClick={onLogout} className="items-end justify-self-end">

        Logout

      </button>



      <Card className="col-sm-4 items-center justify-items-center mx-auto w-full h-auto shadow-xl bg-white-100">
        <Typography>
          <h1 class="mx-auto my-5 text-5xl font-sans">Score Anouncer</h1>
        </Typography>
      </Card>




      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Total Subjects" value={subjectData.length}>
          {/* <RoundIcon
              // icon={ }
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            /> */}
        </Card>
      </div>

      <div class=" grid grid-cols-3 gap-4 mx-24">
        {subjectData.map((user) => (
          <>
            { }
            <Card className="h-full w-fit  bg-gradient-to-tr from-blue-50 hover:drop-shadow-2xl cursor-pointer" onClick={""} herf="/"
              style={{
                transformStyle: "preserve-3d"
              }}>
              <CardBody>
                <Typography vatiant="h5" className="mb-2 text-2xl font-bold peer-focus-within:">
                  {user.title}
                </Typography>
                <Typography>

                </Typography>
                <Typography>
                  {user.description}
                </Typography>

                < Typography >
                  จำนวนเรื่อง : {user.topics.length === 0 ? "ไม่มีหัวข้อ" : user.topics.length}
                </Typography>

                <Typography class="px-6 py-4">

                  <span className="text-sm"></span>
                </Typography>
                <Typography class="px-6 py-4">
                  สร้างเมื่อ {dayjs(user.createdAt).format("DD / MM / YYYY เวลา HH:mm น.")}
                </Typography>
                <Typography class="px-6 py-4">
                  อัพเดพล่าสุด {dayjs(user.updatedAt).format("DD / MM / YYYY เวลา HH:mm น.")}
                </Typography>
              </CardBody>
            </Card>
          </>
        ))}
      </div>
    </div>


  );
};

export default HomeLecturer;
