import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, message, InputNumber, Modal, Select } from "antd";
import ax from "../../conf/ax";
import "../components/edit.css";

const AddScoreStudentTopic = ({
  userId,
  defaultValue,
  closeModal,
  onSubmit,
}) => {
  const { subject, id, max_score } = useParams();
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
    try {
      if (!subject) {
        message.error("Subject ID is missing.");
        return;
      }

      const topicId = id;
      const studentId = values.student;
      const score = [];
      score.push(values.score);
      const existingUser = defaultValue.find(
        (user) => user.users_owner.id === studentId
      );
      if (existingUser) {
        await ax.put(
          `scores/${existingUser.documentId}`,

          { data: { score: score } }
        );
      } else {
        await ax.post("scores?populate=*", {
          data: {
            score: score,
            topic_score_id: {
              id: topicId,
            },
            users_owner: studentId,
          },
        });
      }

      message.success("Scores and topic created successfully!");
      closeModal();
    } catch (error) {
      if (error.response) {
        message.error(`Error: "Failed to create topic and scores."`);
      } else {
        message.error(`Error: ${error.message}`);
      }
    } finally {
    }
  };

  useEffect(() => {
    // console.log(userId);
    fetchStudent();
  }, []);

  return (
    <Modal
      className="custom-modal"
      title="Add student's score"
      open={true}
      onCancel={closeModal}
      footer={false}

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
        <Form.Item className="justify-items-end">
          <button key="cancel" className="text-lg mr-3 mt-3 hover:bg-transparent hover:text-red-600" onClick={closeModal}>
            Cancel
          </button>
          <button type="primary" htmlType="submit" key="submit" className="justify-self-end mx-3 text-lg font-medium text-center w-16 h-10 text-white bg-blue-600 rounded-md hover:bg-blue-900">
            Submit
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddScoreStudentTopic;
