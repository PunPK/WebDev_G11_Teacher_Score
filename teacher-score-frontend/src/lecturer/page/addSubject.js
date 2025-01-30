import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";
import ax from "../../conf/ax";
import Nav_lec from "../../components/navbar";
import "../components/edit.css";

const { TextArea } = Input;

const CreateSubject = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state: ContextState } = useContext(AuthContext);
  const { user } = ContextState;

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const SubjectResponse = await ax.post("subjects?populate=*", {
        data: {
          title: values.title,
          description: values.description,
          create_date: new Date().toISOString(),
          subject_id: values.subject_id,
          users_owner: user.id,
        },
      });
      message.success("Subject created successfully!");
      console.log("Data successfully uploaded to Strapi!");
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card
          title="Create New Subject"
          className="custom-modal w-full max-w-md shadow-lg rounded-xl"
          // className="w-full max-w-md shadow-lg rounded-xl"
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
