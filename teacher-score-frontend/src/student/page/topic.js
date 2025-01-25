import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Spin, Typography, Divider } from "antd";
import TopicList from "../table/studentTopic.js";
import "./home.css";
// import NavList from "../components/navbar-lecturer.js";
// import Nav from "../../components/navbar.js";
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
    <div className="App">
      <div className="col-sm-4">
        <h1>
          <a href="/" onClick={onLogout}>
            Logout
          </a>
        </h1>
        <a href="/">Subject</a>
      </div>

      <body className="App-finance-body">
        <Spin spinning={loading}>
          <Typography.Title>ตาราง</Typography.Title>
          <Divider>topic</Divider>
          <TopicList data={topicData} />
        </Spin>
      </body>
    </div>
  );
};

export default HomeStudent;
