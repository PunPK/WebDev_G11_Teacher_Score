import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Table,
  Checkbox,
  message,
  Typography,
} from "antd";
import { Card } from "@material-tailwind/react";
import ax from "../../conf/ax";
import Nav_lec from "../../components/navbar";
import "../components/table.css";

const AddIDStudent = () => {
  const { id, subject } = useParams();
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state: ContextState } = useContext(AuthContext);
  const { user } = ContextState;

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await ax.get(
          `/subjects/${subject}?populate=users_owner`
        );

        console.log(response.data.data);
        const studentIds = response.data.data.users_owner.map(
          (user) => user.id
        );

        console.log(studentIds);
        setSelectedStudents(studentIds);
        fetchStudents();
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await ax.get(`/users?populate=role`);
        // , {
        //   params: {
        //     filters: {
        //       role: { name: "Student" },
        //     },
        //   },
        // });
        console.log(response.data);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchSubject();
  }, []);

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!subject) {
        message.error("Subject ID is missing.");
        return;
      }

      const updatedUsers = [user.id, ...selectedStudents];
      console.log(updatedUsers);
      await ax.put(`subjects/${subject}?populate=users_owner`, {
        data: { users_owner: updatedUsers },
      });

      message.success("Students added successfully!");
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to add students.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "เลือก",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Checkbox
          defaultChecked={selectedStudents.includes(id)}
          onChange={() => handleCheckboxChange(id)}
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => `${record.role.name}`,
    },
    {
      title: "ชื่อเต็ม",
      dataIndex: "name",
      render: (text, record) => `${record.first_name} ${record.last_name}`,
    },
  ];

  return (
    <div>
      <Nav_lec />
      <div class="grid bg-gradient-to-tl from-red-400 to-pink-500 h-screen">
        <Card
          onClick={() => navigate(-1)}
          className="mt-3 ml-7 w-24 h-12 shadow-xl bg-white mb-6 items-center justify-center group hover:-translate-y-0.5 transition-all duration-200 delay-75 cursor-pointer hover:shadow-blue-900/60 hover:drop-shadow-sm"
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
        <div className="flex justify-end gap-4 mt-2 mr-14">
          <Card
            onClick={() => navigate(`/subject/addstudent/${id}/${subject}`)}
            className="justify-center items-center flex-none h-12 w-48 group bg-gradient-to-tr from-blue-50/40 to-white hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer hover:bg-white hover:shadow-blue-800"
          >
            <div className="w-full items-center">
              <Typography className="font-semibold text-lg text-center">
                Add Student By Import Excel
              </Typography>
            </div>
          </Card>
          <Card
            onClick={() => navigate(`/subject/student-all/${id}/${subject}`)}
            className="justify-center items-center flex-none h-12 w-48 group bg-gradient-to-tr from-blue-50/40 to-white hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer hover:bg-white hover:shadow-blue-800"
          >
            <div className="w-full items-center">
              <Typography className="font-semibold text-lg text-center">
                View All Student
              </Typography>
            </div>
          </Card>
        </div>
        <Table
          dataSource={students}
          columns={columns}
          rowKey="id"
          className="custom-table"
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          className="mr-12"
        >
          Add Selected Students
        </Button>
      </div>
    </div>
  );
};

export default AddIDStudent;
