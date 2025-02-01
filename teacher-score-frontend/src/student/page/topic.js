import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import TopicList from "../table/studentTopic.js";
import { Card, CardBody } from "@material-tailwind/react";
import Nav_lec from "../../components/navbar.js";
import { Progress, Typography } from "@material-tailwind/react";
import dayjs from "dayjs";

const HomeStudent = () => {
  const [topicData, setTopicData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [studentid, setstudentid] = useState();
  const navigate = useNavigate();
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;
  const { subject, username, subject_title } = useParams();

  const onLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  const fetchTopic = async () => {
    setLoading(true);
    try {
      console.log(subject);
      const response = await ax.get("/topics", {
        params: {
          populate: "score_id.users_owner",
          "filters[subject][documentId][$eq]": subject,
        },
      });

      const filteredData = response.data.data.map((item) => ({
        ...item,
        score_id: item.score_id.filter(
          (score) => score.users_owner.id === user.id
        ),
      }));
      console.log(filteredData);
      setTopicData(filteredData);
    } catch (e) {
      console.error("Error fetching student data:", e);
      setError("Error fetching student data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  console.log(subject);

  useEffect(() => {
    if (subject) {
      fetchTopic();
    }
  }, [subject]);

  return (
    <>
      <div class=" bg-gradient-to-tl from-blue-800 to-cyan-300  min-h-screen max-h-full top-0  z-0">
        <Nav_lec className="z-50" />
        <div className="mt-3">
          <Card
            onClick={() => navigate(-1)}
            className="  ml-7 w-24 h-12 shadow-xl bg-white mb-6 items-center justify-center group hover:-translate-y-0.5 transition-all duration-200 delay-75 cursor-pointer hover:shadow-blue-900/60 hover:drop-shadow-sm"
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
        </div>
        <Card className="mt-1 mx-auto w-fit h-28 shadow-xl bg-white mb-6 items-center justify-center">
          <Typography className="font-bold mx-12 w-fit text-gray-800 my-auto h-fit text-3xl">
            คะแนนวิชา
          </Typography>

          <Typography className="font-extrabold mx-12 w-fit text-gray-800 my-auto h-fit text-5xl">
            {subject_title}
          </Typography>
        </Card>

        <Card className="mx-32 h-fit mt-2 z-10">
          <div className="mx-6 my-5">
            {topicData.map((topic) => (
              <Card className="bg-white z-20 h-full mb-3">
                <CardBody>
                  <Typography className=" " variant="h2">
                    {topic.topic_title}
                  </Typography>
                  <Typography className="group-hover:text-white text-lg">
                    อัพเดพล่าสุด{" "}
                    {dayjs(user.updatedAt).format(
                      "DD / MM / YYYY เวลา HH:mm น."
                    )}
                  </Typography>
                  <div className="w-full">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <Typography color="blue-gray" variant="h6">
                        คะแนนที่ได้ :
                      </Typography>
                      <Typography
                        color="blue-gray"
                        className="font-semibold"
                        variant="h5"
                      >
                        {topic.score_id.length !== 0
                          ? topic.score_id[0].score
                          : "ไม่มีคะแนน"}{" "}
                        / {topic.max_score} ({" "}
                        {topic.score_id.length !== 0
                          ? (
                              (topic.score_id[0].score / topic.max_score) *
                              100
                            ).toFixed(2)
                          : "0"}
                        % )
                      </Typography>
                    </div>
                    <Progress
                      size="lg"
                      color={
                        topic.score_id.length !== 0
                          ? (topic.score_id[0].score / topic.max_score) * 100 >=
                            70
                            ? "green"
                            : "red"
                          : ""
                      }
                      value={
                        topic.score_id.length !== 0
                          ? (topic.score_id[0].score / topic.max_score) * 100
                          : "ไม่มีคะแนน"
                      }
                    />
                  </div>
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
