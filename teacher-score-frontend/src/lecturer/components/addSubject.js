import React, { useState, useContext } from "react";
import {
    Modal,
    Form,
    message,
    Input,
    Button,
} from "antd";
import ax from "../../conf/ax.js";
import { AuthContext } from "../../context/Auth.context.js";
import "./edit.css";
const { TextArea } = Input;

const AddSubjectModal = ({ defaultValue, closeModal, onSubmit }) => {
    const [loading, setLoading] = useState(false);
    const { state: ContextState } = useContext(AuthContext);
    const { user } = ContextState;
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await ax.post("subjects?populate=*", {
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
            closeModal()
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
        <Modal
            className="custom-modal"
            title="Add Subject"
            open={true}
            onCancel={closeModal}
            footer={null}
        >
            <Form layout="vertical" form={form} onFinish={handleSubmit} className="bg-transparent border-transparent">
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

export default AddSubjectModal;
