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
import { Popconfirm } from "antd";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const DetailTopicLecturer = () => {
  const { subject } = useParams();
  const [topicData, setTopicData] = useState([]);
  const navigate = useNavigate();
  const { state: ContextState, logout } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const { user } = ContextState;
  const [isLoading, setIsLoading] = useState(null);

  const onLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  const fetchTopic = async () => {
    try {
      const response = await ax.get(
        `/topics/${subject}?populate=score_id.users_owner`
      );
      //     , {
      //     params: {
      //       populate: "*",
      //       "filters[subject][id][$eq]": subject,
      //     },
      //   });
      console.log(response.data.data.score_id);
      setTopicData(response.data.data.score_id);
    } catch (e) {
      console.log(e);
    }
  };
  const handleRowDeleted = async (itemId) => {
    try {
      setIsLoading(true);
      await ax.delete(`scores/${itemId}`);
      fetchTopic();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };



  function onPageChange(p) {
    setPage(p);
  }

  useEffect(() => {
    fetchTopic();
  }, []);

  return (
    <>
      <Nav_lec />

      <div class="grid bg-gradient-to-tr from-red-400 to-pink-500 min-h-screen max-h-full top-0 mt-0 z-10">
        <Card onClick={() => navigate(-1)} className="mt-3 ml-7 w-24 h-12 shadow-xl bg-white mb-6 items-center justify-center group hover:-translate-y-0.5 transition-all duration-200 delay-75 cursor-pointer hover:shadow-blue-900/60 hover:drop-shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
          <p className="font-extrabold w-20 text-center">
            Back
          </p>
        </Card>
        <Card className="mt-7 mx-auto w-auto h-24 shadow-xl bg-white mb-6">
          <Typography className="font-extrabold items-center justify-items-center w-fit mx-auto my-auto">
            <h1 class="mx-12 text-3xl font-sans ">หัวข้อประกาศคะแนน</h1>
          </Typography>
        </Card>
        <div className="justify-items-end mb-3 mr-[8.5rem] h-8">
          <Card
            onClick={() => navigate(`/topic/create/${subject}`)}
            className=" h-8 w-28 group  bg-green-700 hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-gradient-to-tr hover:from-green-700 hover:to-teal-900  hover:shadow-teal-800 items-center justify-center"
          >
            <div className=" w-28 items-center">
              <Typography className="font-semibold text-md text-white group-hover:text-white my-auto justify-self-center text-center">
                Add Score
              </Typography>
            </div>
          </Card>
        </div>
        <div className="flex gap-4 mb-4 mx-[8.5rem] h-12">
          <Card className="bg-white flex-1 group w-18 justify-center">
            <div className="my-auto mx-auto">
              <CardBody>
                <Typography className="font-bold text-md">ลำดับ</Typography>
              </CardBody>
            </div>
          </Card>
          <Card className="bg-white w-60 flex-none justify-center">
            <div className="my-auto mx-auto">
              <CardBody>
                <Typography className="font-bold text-md">
                  จำนวนนักศึกษาที่ประกาศ
                </Typography>
              </CardBody>
            </div>
          </Card>
          <Card className="bg-white flex-none group w-60 justify-center">
            <div className="my-auto mx-auto">
              <CardBody>
                <Typography className="font-bold text-md">คะแนน</Typography>
              </CardBody>
            </div>
          </Card>
          <Card className="bg-white w-64 flex-none justify-center">
            <div className="my-auto mx-auto">
              <CardBody>
                <Typography className="font-bold text-md">
                  อัพเดทล่าสุด
                </Typography>
              </CardBody>
            </div>
          </Card>
          <Card className="bg-white w-20 flex-none group justify-center">
            <div className="my-auto mx-auto">
              <CardBody>
                <Typography className="font-bold text-center text-md">
                  ลบ
                </Typography>
              </CardBody>
            </div>
          </Card>
        </div>
        <Card className="mx-28 h-fit bg-white/15 my-2">
          <div class="  mx-6 my-5">
            {topicData.map((user) => (
              <>
                <div className="flex gap-4 w-auto my-4 h-12">
                  <Card className="flex-1 group w-18  bg-gradient-to-tr from-blue-50 hover:drop-shadow-5xl">
                    <div className="my-auto">
                      <CardBody
                        onClick={() =>
                          navigate(`/topic/detail/${user.documentId}`)
                        }
                      >
                        <Typography
                          vatiant="h5"
                          className=" text-xl font-bold justify-items-center"
                        >
                          {user.id}
                          {/* {user.users_owner.first_name} */}
                        </Typography>
                      </CardBody>
                    </div>
                  </Card>
                  <Card className="flex-none group w-60 text-center  bg-gradient-to-tr from-blue-50 hover:drop-shadow-5xl">
                    <div className="my-auto mx-auto">
                      <CardBody>
                        <Typography
                          vatiant="h5"
                          className="my-auto mx-auto text-md font-semibold"
                        >
                          {" "}
                          {`${user.users_owner.first_name} ${user.users_owner.last_name}`}
                          {/* {user.score_id.length === 0
                            ? "ยังไม่มีการประกาศคะแนน"
                            : user.score_id.length} */}
                        </Typography>
                      </CardBody>
                    </div>
                  </Card>
                  <Card className="flex-none group w-60 text-center  bg-gradient-to-tr from-blue-50 hover:drop-shadow-5xl">
                    <CardBody>
                      <Typography
                        vatiant="h5"
                        className="my-auto mx-auto text-md font-semibold"
                      >
                        {user.score === null
                          ? "ยังไม่กำหนดคะแนนเต็ม"
                          : user.score}
                      </Typography>
                    </CardBody>
                  </Card>
                  <Card className="flex-none group w-64  bg-gradient-to-tr from-red-50">
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

                  <Card className="flex-none group w-20 bg-gradient-to-tr from-red-200 hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-gradient-to-tr hover:from-red-700 hover:to-pink-900  hover:shadow-red-400 ">
                    {/* <CardBody> */}
                    <Popconfirm
                      title="Delete the topic"
                      description="Are you sure to delete this topic?"
                      onConfirm={() => handleRowDeleted(user.documentId)}
                    >
                      <CardBody>Delete</CardBody>
                    </Popconfirm>
                    {/* </CardBody> */}
                  </Card>
                </div>
              </>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default DetailTopicLecturer;
