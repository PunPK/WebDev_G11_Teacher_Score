import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Card, message, InputNumber } from "antd";
import axios from "axios";
import ax from "../../conf/ax";
import * as XLSX from "xlsx";
import Nav_lec from "../../components/navbar";
const { TextArea } = Input;

const CreateTopic = () => {
  const { subject } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (!subject) {
        throw new Error("Subject ID is missing.");
      }
      const topicResponse = await ax.post("topics?populate=*", {
        data: {
          topic_title: values.title,
          subject: subject,
          max_score: values.maxScore,
          upload_time: new Date().toISOString(),
        },
      });
      console.log(topicResponse);
      const topicId = topicResponse.data.data.id;
      message.success("Topic created successfully!");
      console.log(data);
      //   const response = await ax.get(`users`);
      //   const existingData = response.data;
      //   console.log(existingData);
      //   data.forEach(async (newItem) => {
      //     console.log("Processing:", newItem);
      //     const match = existingData.find(
      //         (existing) => existing.username === newItem.username
      //     );

      //     if (match) {
      //       match.score = match.score || [];
      //       match.score.push(newItem.score);
      //       console.log(match);

      //       await ax.post("scores?populate=*", {
      //         data: {
      //           score: match.score,
      //           topic_score_id: {
      //             id: topicId,
      //           },
      //           users_owner: match.id,
      //         },
      //       });
      //     }
      //   });

      for (const newItem of data) {
        const response = await ax.get(`users`);
        const existingData = response.data;
        console.log(existingData);
        // ใช้ for...of แทน forEach
        console.log("Processing:", newItem);
        // console.log("Existing Data:", existingData.username);
        // console.log("New Data:", newItem.username);
        const match = existingData.find((existing) => {
          const existingUsername = String(existing.username || "")
            .trim()
            .toLowerCase();
          const newUsername = String(newItem.username || "")
            .trim()
            .toLowerCase();
          //   console.log(`newItem.username:`, newUsername);
          //   console.log(`Type of newUsername:`, typeof newUsername);
          //   console.log(`newItem.username:`, existing.username);
          //   console.log(`Type of existingUsername:`, typeof existingUsername);
          return existingUsername === newUsername;
        });
        // const match = existingData.find(
        //   (existing) => existingUsername === newItem.username
        // );
        console.log(match);
        if (match) {
          match.score = match.score || [];
          match.score.push(newItem.score);
          console.log(match);
        }

        // รอให้ POST เสร็จสมบูรณ์ก่อนที่จะไปยังรอบถัดไป
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
      //   alert("Data successfully uploaded to Strapi!");

      message.success("created successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        message.error(
          `Error: ${error.response.data.error || "Failed to create topic."}`
        );
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
      console.log(parsedData);
      setData(parsedData);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  return (
    <div>
      <Nav_lec />
      <div className="flex justify-center items-center min-h-screen">
        <Card
          title="Create New Topic"
          className="w-full max-w-md shadow-lg rounded-xl"
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

            {/* <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter the topic description!",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Enter topic description" />
          </Form.Item> */}

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
