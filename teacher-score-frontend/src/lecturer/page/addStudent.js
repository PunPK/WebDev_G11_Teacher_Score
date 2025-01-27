import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, message, InputNumber } from "antd";
import { Card } from "@material-tailwind/react";
import axios from "axios";
import ax from "../../conf/ax";
import * as XLSX from "xlsx";
import Nav_lec from "../../components/navbar";
const { TextArea } = Input;

const AddStudent = () => {
  const { id, subject } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (!subject) {
        throw new Error("Subject ID is missing.");
      }
      console.log(data);
      //   const list = [];
      //   for (const newItem of data) {
      //     console.log(newItem.id);

      //     // ดึงข้อมูลปัจจุบันของ subjects ก่อน
      //     // const response = await ax.get(`subjects/${subject}?populate=*`);
      //     // const currentData = response.data.data.users_owner;
      //     // console.log(currentData);
      //     // const currentUsersOwner = currentData?.id || [];
      //     // console.log(currentUsersOwner);
      //     // รวม id ของ newItem ลงใน users_owner
      //     // const updatedUsersOwner = [...currentUsersOwner, newItem.id];
      //     // console.log(updatedUsersOwner);
      //     list.append(newItem.id);
      //     console.log(list);
      //   }
      //   await ax.put(`subjects/${subject}?populate=*`, {
      //     data: {
      //       users_owner: list,
      //     },
      //   });
      const list = [];
      for (const newItem of data) {
        console.log(newItem.id);

        // เพิ่ม id ของ newItem ลงใน list
        list.push(newItem.id); // ใช้ push แทน append
        console.log(list);
      }

      // ส่งคำขอ PUT เพื่ออัปเดต users_owner
      await ax.put(`subjects/${subject}?populate=*`, {
        data: {
          users_owner: list, // ส่งอาเรย์ของ id ไปใน users_owner
        },
      });

      console.log(`Successfully updated users_owner for subject: ${subject}`);

      console.log("Data successfully uploaded to Strapi!");

      message.success("created successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        message.error(
          `Error: ${error.response.data.error || "Failed to create topic."}`
        );
      } else {
        console.error("Error:", error.message);
        message.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      console.log(parsedData);
      setData(parsedData);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  return (
    <div>
      <Nav_lec />
      <div className="flex mx-20 justify-center items-center min-h-screen">

        <Card
          className="mx-24 items-center  shadow-lg"
        >

          <div className="group h-12 w-full shadow-md shadow-black items-center justify-items-center rounded-t-lg hover:bg-gradient-to-tr bg-gradient-to-tr from-light-blue-700 to-blue-400  text-white">
            <span
              onClick={() => navigate(`/subject/addstudent/${id}/${subject}`)}
              className="justify-self-center my-auto font-semibold text-center"
            >
              Add Student
            </span>
          </div>

          <Form layout="vertical" onFinish={handleSubmit}>

            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
            {data.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
              >
                Upload Student
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div >
    </div >
  );
};

export default AddStudent;
