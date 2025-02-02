import React, { useState } from "react";
import { Modal, Form, Input, Button, message, InputNumber } from "antd";
import ax from "../../conf/ax.js";
import "./edit.css";
import { useParams } from "react-router";

const EditTopic = ({ userId, defaultValue, closeModal, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { max_score } = useParams();

  const handleRowEdited = async () => {
    try {
      const formData = await form.validateFields();
      setIsLoading(true);
      const response = await ax.put(
        `http://localhost:1337/api/topics/${userId}`,

        { data: formData }
      );
      message.success("Update successfully!");
      closeModal();
    } catch (errorInfo) {
      console.error("Validation or Update Failed:", errorInfo);
      if (errorInfo.response) {
        console.error("Response Data:", errorInfo.response.data);
        console.error("Response Status:", errorInfo.response.status);
        console.error("Response Headers:", errorInfo.response.headers);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      className="custom-modal"
      title="Edit Topic"
      open={true}
      onCancel={closeModal}
      footer={[
        <button className="text-lg mr-3 mt-3 l-0 hover:bg-transparent hover:text-red-600" key="cancel " onClick={closeModal}>
          Cancel
        </button>,
        <button className="mx-3 text-lg font-medium text-center w-16 h-10 text-white bg-blue-600 rounded-md hover:bg-blue-900" key="submit" type="primary" onClick={handleRowEdited}>
          Edit
        </button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          topic_title: defaultValue.topic_title,
          max_score: defaultValue.max_score,
        }}
      >
        <Form.Item
          name="topic_title"
          label="ชื่อหัวข้อ :"
          className="font-semibold text-xl"
          rules={[{ required: true, message: "กรุณาระบุชื่อหัวข้อ" }]}
        >
          <Input placeholder="ชื่อวิชา" />
        </Form.Item>
        <Form.Item
          name="max_score"
          label="Max Score :"
          rules={[{ required: true, message: "กรุณาระบุคะแนนเต็ม", max: max_score }]}
        >
          <InputNumber placeholder="Enter maximum score" className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTopic;
