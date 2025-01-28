import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import ax from "../../conf/ax.js";
import "./edit.css";

const EditSubject = ({ userId, defaultValue, closeModal, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleRowEdited = async () => {
    try {
      const formData = await form.validateFields();

      setIsLoading(true);
      const response = await ax.put(
        `http://localhost:1337/api/subjects/${userId}`,
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
      title="Edit transaction"
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
          title: defaultValue.title,
          description: defaultValue.description,
        }}
      >
        <Form.Item
          name="title"
          label="ชื่อวิชา :"
          rules={[{ required: true, message: "กรุณาระบุชื่อวิชา" }]}
        >
          <Input placeholder="ชื่อวิชา" />
        </Form.Item>
        <Form.Item
          name="description"
          label="รายละเอียด :"
          rules={[{ required: true, message: "กรุณาระบุรายละเอียด" }]}
        >
          <Input.TextArea placeholder="รายละเอียดวิชา" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditSubject;
