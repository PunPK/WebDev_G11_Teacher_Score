import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Card, message, InputNumber } from "antd";
import axios from "axios";
import ax from "../../conf/ax";
import * as XLSX from "xlsx";
import Nav_lec from "../../components/navbar";
// import "../components/add.css";

const { TextArea } = Input;

const CreateSubject = () => {
  const { subject } = useParams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const SubjectResponse = await ax.post("subjects?populate=*", {
        data: {
          title: values.title,
          description: values.description,
          create_date: new Date().toISOString(),
          subject_id: values.subject_id,
        },
      });
      console.log(SubjectResponse);
      message.success("Subject created successfully!");
      console.log("Data successfully uploaded to Strapi!");
      //   alert("Data successfully uploaded to Strapi!");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        message.error(
          `Error: ${error.response.data.error || "Failed to create Subject."}`
        );
      } else {
        console.error("Error:", error.message);
        message.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav_lec />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card
          title="Create New Subject"
          className="w-full max-w-md shadow-lg rounded-xl"
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please enter the Subject title!" },
              ]}
            >
              <Input placeholder="Enter Subject title" />
            </Form.Item>
            <Form.Item
              label="Subject ID"
              name="subject_id"
              rules={[
                { required: true, message: "Please enter the subject ID!" },
              ]}
            >
              <Input placeholder="Enter subject ID" />
            </Form.Item>
            <Form.Item
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
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
              >
                Create Subject
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CreateSubject;
