import React, { useState, useEffect } from "react";
import { Spin, Typography, Divider, Form, Input } from "antd";
import ax from "../../conf/ax.js";
import { useParams } from "react-router-dom";

function EditSubjectInfo() {
    const [isLoading, setIsLoading] = useState(false);
    const [subjectData, setSubjectData] = useState(null);
    const { subject } = useParams();
    const [form] = Form.useForm();

    const fetchSubject = async () => {
        setIsLoading(true);
        try {
            const response = await ax.get(
                `http://localhost:1337/api/subjects/${subject}`,
                {
                    params: {
                        populate: "*",
                    },
                }
            );
            console.log("API Response:", response.data); 
            const data = response.data.data; 
            if (data) {
                setSubjectData(data); 
                form.setFieldsValue({
                    title: data.title || "", 
                    description: data.description || "", 
                });
            } else {
                console.error("No data found in API response");
            }
        } catch (e) {
            console.error("Error fetching subject data:", e);
        } finally {
            setIsLoading(false);
        }
    };
    
    

    useEffect(() => {
        fetchSubject();
    }, [subject]);

    const handleFormSubmit = async () => {
        try {
            const formData = await form.validateFields();
            console.log("Form Data Submitted:", formData);
    
            setIsLoading(true);
            const response = await ax.put(
                `http://localhost:1337/api/subjects/${subject}`,
                { data: formData }
            );
            console.log("Update Response:", response.data);
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
        <div>
            <Spin spinning={isLoading}>
                <Typography.Title level={3}>รายละเอียดวิชา</Typography.Title>
                <Divider />
                {subjectData ? (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleFormSubmit}
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
                        <Form.Item>
                            <button type="submit" className="ant-btn ant-btn-primary">
                                บันทึก
                            </button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Typography.Text>No data available</Typography.Text>
                )}
            </Spin>
        </div>
    );
}

export default EditSubjectInfo;
