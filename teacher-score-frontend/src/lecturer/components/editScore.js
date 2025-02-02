import React, { useState } from "react";
import {
  Modal,
  Form,
  message,
  InputNumber,
  Typography,
} from "antd";
import ax from "../../conf/ax.js";
import "./edit.css";
import { useParams } from "react-router";

const EditScore = ({ defaultValue, closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { max_score } = useParams();
  const [form] = Form.useForm();

  const handleRowEdited = async () => {
    try {
      const formData = await form.validateFields();
      setIsLoading(true);
      // console.log(formData.Score);
      const response = await ax.put(
        `http://localhost:1337/api/scores/${defaultValue.documentId}`,

        { data: { score: formData.Score } }
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
  // console.log(defaultValue);
  return (
    <Modal
      className="custom-modal"
      title="Edit Score"
      open={true}
      onCancel={closeModal}
      footer={[
        <button
          className="text-lg mr-3 mt-3 l-0 hover:bg-transparent hover:text-red-600"
          key="cancel "
          onClick={closeModal}
        >
          Cancel
        </button>,
        <button
          className="mx-3 text-lg font-medium text-center w-16 h-10 text-white bg-blue-600 rounded-md hover:bg-blue-900"
          key="submit"
          type="primary"
          onClick={handleRowEdited}
        >
          Edit
        </button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          Score: defaultValue.score,
          Name: defaultValue.users_owner.first_name,
        }}
      >
        <Form.Item
          name="Name"
          label="ชื่อนักศึกษา :"
          className="font-semibold text-xl"
        //   rules={[{ required: true, message: "กรุณาระบุชื่อหัวข้อ" }]}
        >
          <Typography.Text strong>
            {`Student Name : ${defaultValue.users_owner.first_name} ${defaultValue.users_owner.last_name}`}
          </Typography.Text>
        </Form.Item>
        <Form.Item
          name="Score"
          label="Score :"
          rules={[{ required: true, message: "กรุณาระบุคะแนนใหม่" }]}
        >
          <InputNumber
            max={max_score}
            placeholder="Enter new score"
            className="w-full"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditScore;
