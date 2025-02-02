import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, message } from "antd";
import { Card } from "@material-tailwind/react";
import ax from "../../conf/ax";
import * as XLSX from "xlsx";
import Nav_lec from "../../components/navbar";
import "../components/edit.css";

const AddStudent = () => {
  const { subject } = useParams();
  const [data, setData] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await ax.get(
          `/subjects/${subject}?populate=users_owner`
        );

        // console.log(response.data.data);
        const studentIds = response.data.data.users_owner.map(
          (user) => user.id
        );

        // console.log(studentIds);
        setSelectedStudents(studentIds);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchSubject();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (!subject) {
        message.error("Subject ID is missing.");
      }
      // const list = [];
      // list.push(user.id);
      for (const newItem of data) {
        // console.log(newItem.id);
        selectedStudents.push(newItem.id);
        // console.log(selectedStudents);
      }

      await ax.put(`subjects/${subject}?populate=*`, {
        data: {
          users_owner: selectedStudents,
        },
      });
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
      // console.log(parsedData);
      setData(parsedData);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
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
      <div className="flex mx-20 justify-center items-center min-h-screen">
        <Card className="custom-modal mx-24 items-center  shadow-lg">
          <div className="group h-12 w-full shadow-md shadow-black items-center justify-items-center rounded-t-lg hover:bg-gradient-to-tr bg-gradient-to-tr from-light-blue-700 to-blue-400  text-white">
            <span className="justify-self-center my-auto font-semibold text-center">
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
      </div>
    </div>
  );
};

export default AddStudent;
