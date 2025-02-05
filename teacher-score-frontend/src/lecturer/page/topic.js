import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import ax from "../../conf/ax.js";
import { useNavigate } from "react-router";
import Nav_lec from "../../components/navbar.js";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { Popconfirm, message } from "antd";
import EditTopic from "../components/editTopic.js";

const TopicLecturer = () => {
  const { subject, subject_title, documentId } = useParams();
  const [topicData, setTopicData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(null);
  const [isModalShow, setIsModalShow] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const openModal = (id, data) => {
    setCurrentUserId(id);
    setCurrentData(data);
    console.log("Open modal...");
    setIsModalShow(true);
  };

  const closeModal = () => {
    setCurrentData(null);
    setCurrentUserId(null);
    console.log("Closing modal...");
    setIsModalShow(false);
    fetchTopic();
  };

  const fetchTopic = async () => {
    try {
      const response = await ax.get("/topics", {
        params: {
          populate: "*",
          "filters[subject][id][$eq]": subject,
        },
      });
      setTopicData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleRowDeleted = async (itemId) => {
    try {
      setIsLoading(true);
      const response = await ax.get(`topics/${itemId}?populate=*`);
      await ax.delete(`topics/${itemId}`);
      const scores = response.data.data.score_id;
      for (const score of scores) {
        await ax.delete(`scores/${score.documentId}`);
      }

      message.success("Topic and associated scores deleted successfully!");
      fetchTopic();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopic();
  }, []);

  return (
    <>
      <div class="bg-gradient-to-t from-pink-900 to-purple-800 min-h-screen max-h-full top-0 mt-0 z-0">
        <Nav_lec className="z-50" />
        <Card
          onClick={() => navigate(-1)}
          className="mt-3 mb-8 ml-7 w-24 h-12 shadow-xl bg-white items-center justify-center group hover:-translate-y-0.5 transition-all duration-200 delay-75 cursor-pointer hover:shadow-blue-900/60 hover:drop-shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <p className="font-extrabold w-20 text-center">Back</p>
        </Card>

        <Card className=" mx-auto min-w-38 max-w-[38rem] h-24 shadow-xl bg-white mb-6">
          <Typography className="font-extrabold items-center justify-items-center w-fit mx-auto my-auto">
            <h3 class="mx-12 text-3xl font-sans ">ประกาศคะแนนวิชา</h3>
            <h1 class="mx-12 text-3xl font-sans ">{subject_title}</h1>
          </Typography>
        </Card>

        <div className="justify-items-end mr-[8.5rem] h-12 mt-2">
          <Card
            onClick={() => navigate(`/topic/create/${subject}`)}
            className="justify-center items-center flex-none h-10 w-32 group bg-gradient-to-tr from-teal-900 to-cyan-900 hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-gradient-to-br hover:from-teal-900 hover:to-green-900  hover:shadow-teal-800"
          >
            <div className=" w-36 items-center">
              <Typography className="font-semibold text-lg my-auto justify-self-center text-center text-white group-hover:text-yellow-600">
                Add Topic
              </Typography>
            </div>
          </Card>
        </div>

        <div className="flex gap-4 my-3 mx-[8.5rem] h-12 ">
          <Card className="bg-white flex-1 group w-18 justify-center">
            <div className="my-auto mx-auto">
              <CardBody>
                <Typography className="font-bold text-md">
                  ชื่อหัวข้อ (คลิกเพื่อไปสู่หน้าคะแนน)
                </Typography>
              </CardBody>
            </div>
          </Card>

          <Card className="bg-white w-48 flex-none justify-center">
            <div className="my-auto mx-auto">
              <CardBody>
                <Typography className="font-bold text-md">
                  จำนวนการประกาศ
                </Typography>
              </CardBody>
            </div>
          </Card>

          <Card className="bg-white flex-none group w-44 justify-center">
            <div className="my-auto mx-auto">
              <CardBody>
                <Typography className="font-bold text-md">คะแนนเต็ม</Typography>
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

          <Card className="flex-none group w-14 items-center justify-center">
            <CardBody>
              <Typography
                vatiant="h5"
                className="my-auto mx-auto text-md font-bold "
              >
                แก้ไข
              </Typography>
            </CardBody>
          </Card>

          <Card className="flex-none group w-14 items-center justify-center">
            <CardBody>
              <Typography
                vatiant="h5"
                className="my-auto mx-auto text-md font-bold "
              >
                ลบ
              </Typography>
            </CardBody>
          </Card>
        </div>
        <Card className="mx-28 h-fit bg-white/15 mt-1 mb-2">
          <div class="  mx-6 my-5">
            {topicData.length > 0 ? (
              topicData.map((topic) => (
                <>
                  <div className="flex gap-4 w-auto my-4 h-12">
                    <Card
                      onClick={() =>
                        navigate(
                          `/topic/detail/${topic.topic_title}/${documentId}/${topic.max_score}/${topic.id}/${topic.documentId}`
                        )
                      }
                      className="flex-1 group w-18  bg-gradient-to-tr from-blue-50 hover:drop-shadow-5xl items-start justify-center group-hover:text-white hover:-translate-y-0.5 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-gradient-to-tr hover:from-pink-900 hover:to-red-500  hover:shadow-red-400 "
                    >
                      <div className="my-auto">
                        <CardBody>
                          <Typography
                            vatiant="h5"
                            className=" text-xl font-bold items-center group-hover:text-white"
                          >
                            {topic.topic_title}
                          </Typography>
                        </CardBody>
                      </div>
                    </Card>

                    <Card className="flex-none group w-48 text-center  bg-gradient-to-tr from-blue-50 hover:drop-shadow-5xl items-start justify-center">
                      <div className="my-auto mx-auto">
                        <CardBody>
                          <Typography
                            vatiant="h5"
                            className="my-auto mx-auto text-md font-semibold"
                          >
                            {topic.score_id.length === 0
                              ? "ยังไม่มีการประกาศ"
                              : topic.score_id.length}
                          </Typography>
                        </CardBody>
                      </div>
                    </Card>

                    <Card className="flex-none group w-44 text-center  bg-gradient-to-tr from-blue-50 hover:drop-shadow-5xl items-center justify-center">
                      <CardBody>
                        <Typography
                          vatiant="h5"
                          className="my-auto mx-auto text-md font-semibold"
                        >
                          {topic.max_score === null
                            ? "ยังไม่กำหนด"
                            : topic.max_score}
                        </Typography>
                      </CardBody>
                    </Card>
                    <Card className="flex-none group w-64  bg-gradient-to-tr from-red-50 items-start justify-center">
                      <CardBody>
                        <Typography
                          vatiant="h"
                          className="my-auto mx-auto text-md"
                        >
                          {dayjs(topic.updatedAt).format(
                            "DD / MM / YYYY เวลา HH:mm น."
                          )}
                        </Typography>
                      </CardBody>
                    </Card>

                    <Card
                      onClick={() => openModal(topic.documentId, topic)}
                      className="flex-none group w-14 bg-gradient-to-tr from-blue-500 to-blue-900 hover:-translate-y-0.5 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-gradient-to-tr hover:from-blue-700 hover:to-blue-900  hover:shadow-blue-900 items-center justify-center"
                    >
                      <CardBody>
                        <Typography
                          vatiant="h5"
                          className="my-auto mx-auto text-lg text-white font-bold group-hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </Typography>
                      </CardBody>
                    </Card>

                    <Popconfirm
                      title="Delete the topic"
                      description="Are you sure to delete this topic?"
                      onConfirm={() => handleRowDeleted(topic.documentId)}
                    >
                      <Card className="flex-none group w-14 bg-gradient-to-tr from-red-500 to-red-900 hover:-translate-y-0.5 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-gradient-to-tr hover:from-red-700 hover:to-pink-900  hover:shadow-red-400 items-center justify-center">
                        <CardBody>
                          <Typography
                            vatiant="h5"
                            className="my-auto mx-auto text-lg text-white font-bold group-hover:text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </Typography>
                        </CardBody>
                      </Card>
                    </Popconfirm>
                  </div>
                </>
              ))
            ) : (
              <Typography className="text-white text-4xl text-center">
                ยังไม่มีหัวข้อในวิชานี้
              </Typography>
            )}
          </div>
        </Card>
        {isModalShow && (
          <EditTopic
            userId={currentUserId}
            defaultValue={currentData}
            closeModal={closeModal}
            onSubmit={(updatedData) =>
              console.log("Updated Data")
            }
          />
        )}
      </div>
    </>
  );
};

export default TopicLecturer;
