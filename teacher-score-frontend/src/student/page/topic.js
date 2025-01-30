import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Spin, Typography, Divider } from "antd";
import TopicList from "../table/studentTopic.js";
import "./home.css";
import { Card, CardBody } from "@material-tailwind/react";
import Nav_lec from "../../components/navbar.js";


const HomeStudent = () => {
  const [topicData, setTopicData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [studentid, setstudentid] = useState();
  const navigate = useNavigate();
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;
  const { subject } = useParams();

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
          populate: "*",
          "filters[subject][documentId][$eq]": subject,
        },
      });
      console.log(response.data.data);
      setTopicData(response.data.data);
    } catch (e) {
      console.error("Error fetching student data:", e);
      setError("Error fetching student data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  console.log(subject)

  useEffect(() => {
    if (subject) {
      fetchTopic();
    }
  }, [subject]);

  return (
    <>

      <Nav_lec />
      <div class="grid bg-gradient-to-tl from-blue-800 to-cyan-300 min-h-[20rem] max-h-full top-0 mt-0 z-10">
        <Card onClick={() => navigate(-1)} className="mt-3 ml-7 w-24 h-12 shadow-xl bg-white mb-6 items-center justify-center group hover:-translate-y-0.5 transition-all duration-200 delay-75 cursor-pointer hover:shadow-blue-900/60 hover:drop-shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
          <p className="font-extrabold w-20 text-center">
            Back
          </p>
        </Card>

        <Card className="mt-1 mx-auto w-auto h-24 shadow-xl bg-white mb-6 items-center justify-center">
          <Typography className="font-extrabold mx-12 w-fit text-gray-800 my-auto h-fit text-3xl">
            คะแนนในหัวข้อ
          </Typography>
        </Card>


        <Card className="mx-28 h-fit my-2">
          <div className="mx-6 my-5">
            {topicData.map((topic) => (
              <>
                <div className="flex gap-4 w-auto my-2 mx-28 h-12">
                  <Card className="flex-1 w-28 items-start justify-center ">
                    <CardBody >
                      <Typography className="font-bold text-lg">
                        {topic.topic_title}
                      </Typography>
                    </CardBody>
                  </Card>

                  <Card className="flex-none w-24 ml-4">
                    <CardBody >
                      <Typography >
                        {topic.topic_title}
                      </Typography>
                    </CardBody>
                  </Card>

                  <Card className="flex-none w-36 ml-4">
                    <CardBody >
                      {topic.score_id.map((score) => (
                        <Typography >

                          {score.score}
                        </Typography>
                      ))}
                    </CardBody>
                  </Card>

                </div>
              </>

            ))}

          </div>
        </Card>



        <body className="App-finance-body">
          <Spin spinning={loading}>
            <Typography.Title>ตาราง</Typography.Title>
            <Divider>topic</Divider>
            <TopicList data={topicData} />
          </Spin>
        </body>
      </div>
    </>
  );
};

export default HomeStudent;
