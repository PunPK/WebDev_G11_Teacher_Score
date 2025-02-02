import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Button,
  message,
  InputNumber,
  Modal,
  Select,
} from "antd";
import ax from "../../conf/ax";
import "../components/edit.css";

const AddScoreStudentTopic = ({
  userId,
  defaultValue,
  closeModal,
  onSubmit,
}) => {
  const { subject, id, max_score } = useParams();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [form] = Form.useForm();

  const fetchStudent = async () => {
    try {
      const response = await ax.get(
        `/users?filters[subject_owners][documentId][$eq]=${subject}&populate=*`
      );
      setStudents(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (!subject) {
        message.error("Subject ID is missing.");
        return;
      }

      const topicId = id;
      const studentId = values.student;
      const score = [];
      score.push(values.score);
      // console.log(topicId, studentId, score);

      await ax.post("scores?populate=*", {
        data: {
          score: score,
          topic_score_id: {
            id: topicId,
          },
          users_owner: studentId,
        },
      });

      message.success("Scores and topic created successfully!");
      closeModal();
    } catch (error) {
      if (error.response) {
        message.error(`Error: "Failed to create topic and scores."`);
      } else {
        message.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log(userId);
    fetchStudent();
  }, []);

  return (
    <Modal
      className="custom-modal"
      title="Edit transactions"
      open={true}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="student"
          label="เลือกนักเรียน :"
          rules={[{ required: true, message: "กรุณาเลือกนักเรียน" }]}
        >
          <Select showSearch placeholder="เลือกนักเรียน">
            {students.map((student) => (
              <Select.Option key={student.id} value={student.id}>
                {`${student.first_name} ${student.last_name}`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="score"
          label="คะแนน :"
          rules={[{ required: true, message: "กรุณาระบุคะแนน" }]}
        >
          <InputNumber
            max={max_score}
            placeholder="กรอกคะแนน"
            className="w-full"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddScoreStudentTopic;
