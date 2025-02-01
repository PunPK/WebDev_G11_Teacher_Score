import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Card, message, InputNumber } from "antd";
import ax from "../../conf/ax";
import * as XLSX from "xlsx";
import Nav_lec from "../../components/navbar";
import "../components/edit.css";

const CreateTopic = () => {
  const { subject } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (!subject) {
        message.error("Subject ID is missing.");
      }
      const topicResponse = await ax.post("topics?populate=*", {
        data: {
          topic_title: values.title,
          subject: subject,
          max_score: values.maxScore,
          upload_time: new Date().toISOString(),
        },
      });
      const topicId = topicResponse.data.data.id;
      message.success("Topic created successfully!");

      for (const newItem of data) {
        const response = await ax.get(`users`);
        const existingData = response.data;
        const match = existingData.find((existing) => {
          const existingUsername = String(existing.username)
            .trim()
            .toLowerCase();
          const newUsername = String(newItem.username).trim().toLowerCase();
          return existingUsername === newUsername;
        });
        if (match) {
          match.score = match.score || [];
          match.score.push(newItem.score);
          console.log(match);
        }

        await ax.post("scores?populate=*", {
          data: {
            score: match.score,
            topic_score_id: {
              id: topicId,
            },
            users_owner: match.id,
          },
        });
      }

      console.log("Data successfully uploaded to Strapi!");
      message.success("created successfully!");
      navigate(-1);
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        message.error(`Error: "Failed to create topic."`);
      } else {
        console.error("Error:", error.message);
        message.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  return (
    <div>
      <Nav_lec />
      <Card
        onClick={() => navigate(-1)}
        className="mt-3 ml-7 w-32 h-22 shadow-xl bg-white mb-6 items-center justify-center group hover:-translate-y-0.5 transition-all duration-200 delay-75 cursor-pointer hover:shadow-blue-900/60 hover:drop-shadow-sm"
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
      <div className="flex mx-20 justify-center items-center min-h-screen">
        <Card
          title="Create New Topic"
          className="custom-modal mx-24 items-center  shadow-lg"
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please enter the topic title!" },
              ]}
            >
              <Input placeholder="Enter topic title" />
            </Form.Item>

            <Form.Item
              label="Max Score"
              name="maxScore"
              rules={[
                { required: true, message: "Please enter the maximum score!" },
              ]}
            >
              <InputNumber
                placeholder="Enter maximum score"
                className="w-full"
              />
            </Form.Item>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
            {data.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
              >
                Create Topic
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CreateTopic;
