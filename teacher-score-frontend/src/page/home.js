import React, { useEffect, useState } from "react";
import ax from "../conf/ax.js";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { Card, CardBody, Typography } from "@material-tailwind/react";
// import Nav_lec from "../components/nav_lecturer.js";

const HomeLecturer = () => {
  const [subjectData, setSubjectData] = useState([]);
  const navigate = useNavigate();

  const fetchSubject = async () => {
    try {
      const subjectUrl = "http://localhost:1337/api/subjects?populate=*"
      const response = await ax.get(subjectUrl)
      // console.log(response.data.data)
      setSubjectData(response.data.data)

    } catch (e) {
      console.log(e);
    }
    finally {
    }
  };


  useEffect(() => {
    fetchSubject();
  }, [])


  return (

    <div >

      <div class="bg-gradient-to-tl from-cyan-50 h-screen ">

        <Card className="mt-14 col-sm-4 items-center justify-items-center mx-auto w-full h-auto shadow-xl bg-white">
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

        <div class=" grid grid-cols-1 gap-4 mx-24">
          {subjectData.map((user) => (
            <>
              { }
              <Card className="group h-full w-fit  bg-gradient-to-tr from-blue-50 hover:drop-shadow-5xl cursor-pointer hover:bg-blue-900 hover:bg-gradient-to-tr hover:from-blue-700 hover:to-blue-900  hover:shadow-blue-400 " onClick={""} herf="/"
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
                    จำนวนเรื่อง : {user.topics.length === 0 ? "ไม่มีหัวข้อ" : user.topics.length}
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
      </div>
    </div>


  );
};

export default HomeLecturer;
