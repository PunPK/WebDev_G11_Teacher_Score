import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { useNavigate } from "react-router";
import response from "../../utils/demo/tableData";
import Nav_lec from "../../components/navbar.js";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
const TopicLecturer = () => {
  const { subject } = useParams();
  const [topicData, setTopicData] = useState([]);
  const navigate = useNavigate();
  const { state: ContextState, logout } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const { user } = ContextState;

  const onLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  const fetchTopic = async () => {
    try {
      const response = await ax.get("/topics", {
        params: {
          populate: "*",
          "filters[subject][id][$eq]": subject,
        },
      });
      console.log(response.data.data);
      setTopicData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  // pagination setup
  const resultsPerPage = 20;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  useEffect(() => {
    fetchTopic();
  }, []);

  // on page change, load new sliced data
  // here you would make another server request for new data

  return (
    <>
      <Nav_lec />

      <div class="grid bg-gradient-to-tr from-red-400 to-pink-500 min-h-screen max-h-full top-0 mt-0 z-10">
        <Card className="mt-6 mx-auto w-auto h-24 shadow-xl bg-white mb-6">
          <Typography className="font-extrabold items-center justify-items-center w-fit mx-auto my-auto">
            <h1 class="mx-12 text-3xl font-sans ">All score</h1>
          </Typography>
        </Card>
        <Card
          onClick={() => navigate(`/topic/create/${subject}`)}
          className="justify-between flex-none h-10 w-36 group bg-white hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-gradient-to-tr hover:from-red-700 hover:to-pink-900  hover:shadow-red-400"
        >
          <div className=" w-36 items-center">
            <Typography className="font-semibold text-md group-hover:text-white my-auto justify-self-center text-center">
              Add Topic
            </Typography>
          </div>
        </Card>
        <div className="flex gap-10 mb-4 mx-36 ">
          <Card className="bg-white w-26 flex-one">
            <div>
              <CardBody>
                <Typography className="font-bold text-lg">
                  ชื่อหัวข้อ
                </Typography>
              </CardBody>
            </div>
          </Card>
          <Card className="bg-white w-20 flex-auto">
            <div>
              <CardBody>
                <Typography className="font-bold text-lg">คะแนนเต็ม</Typography>
              </CardBody>
            </div>
          </Card>
        </div>
        <Card className="mx-28 h-fit bg-white/15 my-2">
          <div class="  mx-6 my-5">
            {topicData.map((user) => (
              <>
                <div className="flex gap-4 w-auto my-4">
                  <Card className="flex-1 z-10 group h-16 w-18  bg-gradient-to-tr from-blue-50 hover:drop-shadow-5xl">
                    <CardBody>
                      <Typography
                        vatiant="h5"
                        className="my-auto mx-auto text-xl font-bold"
                      >
                        {user.topic_title}
                      </Typography>
                    </CardBody>
                  </Card>
                  <Card className="flex-none z-10 group h-16 w-60 text-center  bg-gradient-to-tr from-blue-50 hover:drop-shadow-5xl">
                    <CardBody>
                      <Typography
                        vatiant="h5"
                        className="my-auto mx-auto text-md font-semibold"
                      >
                        {user.score_id.length === 0
                          ? "ยังไม่มีการประกาศคะแนน"
                          : user.score_id.length}
                      </Typography>
                    </CardBody>
                  </Card>
                  <Card className="flex-none z-10 group h-16 w-60 text-center  bg-gradient-to-tr from-blue-50 hover:drop-shadow-5xl">
                    <CardBody>
                      <Typography
                        vatiant="h5"
                        className="my-auto mx-auto text-md font-semibold"
                      >
                        {user.max_score === null
                          ? "ยังไม่กำหนดคะแนนเต็ม"
                          : user.max_score}
                      </Typography>
                    </CardBody>
                  </Card>
                  <Card className="flex-none z-10 group h-16 w-64  bg-gradient-to-tr from-red-50">
                    <CardBody>
                      <Typography
                        vatiant="h"
                        className="my-auto mx-auto text-md"
                      >
                        {dayjs(user.updatedAt).format(
                          "DD / MM / YYYY เวลา HH:mm น."
                        )}
                      </Typography>
                    </CardBody>
                  </Card>

                  <Card
                    onClick={() => navigate(`/edit/${user.documentId}`)}
                    className="flex-none z-10 group h-16 w-20  bg-gradient-to-tr from-red-200 hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-gradient-to-tr hover:from-red-700 hover:to-pink-900  hover:shadow-red-400 "
                  >
                    <CardBody>
                      <Typography
                        vatiant="h5"
                        className="my-auto mx-auto text-2xl font-bold group-hover:text-white"
                      >
                        Edit
                      </Typography>
                    </CardBody>
                  </Card>
                </div>
              </>
            ))}
          </div>
        </Card>
      </div>
    </>
    // <>
    //   <Nav_lec />
    //   <div className="bg-gradient-to-tr from-red-800 to-pink-300 min-h-screen max-h-screen top-0 mt-0 z-10">

    //     <Card class=" mb-8 mx-96 w-auto h-24 shadow-xl bg-white rounded-xl">
    //       <Typography className="items-center justify-items-center my-auto w-fit mx-auto">
    //         <h1 className="mx-auto my-auto text-3xl font-sans">
    //           Topic that announces the score
    //         </h1>
    //       </Typography>
    //     </Card>

    //     <div classname="grid grid-cols-4 gap-4">

    //       <Card
    //         className="px-6 py-3 text-center  text-lg font-semibold bg-white text-black uppercase "
    //       >
    //         <CardBody>
    //           <Typography className="font-bold text-lg">
    //             Title
    //           </Typography>
    //         </CardBody>
    //       </Card>

    //       <Card
    //         className="px-6 py-3 text-center text-lg font-semibold bg-white text-black uppercase "
    //       >
    //         <CardBody>
    //           <Typography className="font-bold text-lg">
    //             Upload time
    //           </Typography>
    //         </CardBody>
    //       </Card>

    //       <Card
    //         className="px-6 py-3 text-center text-lg font-semibold bg-white text-black uppercase "
    //       >
    //         <CardBody>
    //           <Typography className="font-bold text-lg">
    //             Score
    //           </Typography>
    //         </CardBody>
    //       </Card>
    //       <Card
    //         className="px-6 py-3 text-center text-lg font-semibold bg-white text-black uppercase "
    //       >
    //         <CardBody>
    //           <Typography className="font-bold text-lg">
    //             Edit
    //           </Typography>
    //         </CardBody>
    //       </Card>

    //     </div>

    //     <div>
    //       {topicData.map((user) => (
    //         <Card className="z-10 group h-full w-full  bg-gradient-to-tr from-blue-50 hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-gradient-to-tr hover:from-red-700 hover:to-pink-900  hover:shadow-red-400 ">
    //           <td>
    //             <div className="flex items-center text-sm">
    //               <div>
    //                 <p className="font-semibold">{user.topic_title}</p>
    //               </div>
    //             </div>
    //           </td>
    //           <td>
    //             <span className="text-sm">{user.score_id.score}</span>
    //           </td>
    //           <td>
    //             <p className="font-semibold">{user.topic_id}</p>
    //             {/* <Badge type={user.status}>{user.status}</Badge> */}
    //           </td>
    //         </Card>
    //       ))}

    //     </div>
    //   </div>
    // </ >
  );
};

export default TopicLecturer;
