import React, { useState } from "react";
import { Modal, Form, Input, Button, message, InputNumber } from "antd";
import ax from "../../conf/ax.js";
import "./edit.css";

const EditTopic = ({ userId, defaultValue, closeModal, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

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
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleRowEdited}>
          Edit
        </Button>,
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
          rules={[{ required: true, message: "กรุณาระบุชื่อหัวข้อ" }]}
        >
          <Input placeholder="ชื่อวิชา" />
        </Form.Item>
        <Form.Item
          name="max_score"
          label="Max Score :"
          rules={[{ required: true, message: "กรุณาระบุคะแนนเต็ม" }]}
        >
          <InputNumber placeholder="Enter maximum score" className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTopic;
