// import Bar from "../components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth.context.js";
import ax from "../conf/ax.js";
import { Spin, Typography, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import UserTable from "./UserTable";
import "./user.css";
import Nav_lec from "../components/nav_lecturer.js";

function UserPage() {
  //   const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;
  console.log(user);

  const openModal = (record) => {
    setEditData(record);
    setIsModalShow(true);
  };

  const closeModal = () => {
    setIsModalShow(false);
    setEditData(null);
  };

  // const handleChangedPassword = async () => {
  //   try {
  //     const jwtToken =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM0NzE0NjU1LCJleHAiOjE3MzczMDY2NTV9.nAKGVpQ-iqTRUFcwI21MgH3F0m4mCp4JKSkwwJwBOPs"; // Ensure this is retrieved securely
  //     const resetCode = "";

  //     const response = await axios.post(
  //       "http://localhost:1337/auth/local/reset-password",
  //       {
  //         code: resetCode,
  //         password: "1234567",
  //         passwordConfirmation: "1234567",
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${jwtToken}`,
  //         },
  //       }
  //     );

  //     console.log("Your user's password has been changed.", response.data);
  //   } catch (error) {
  //     console.error(
  //       "An error occurred:",
  //       error.response?.data || error.message
  //     );
  //   }
  // };

  // const handleRowEdited = async (item) => {
  //   try {
  //     setIsLoading(true);

  //     const payload = {
  //       username: item.username,
  //       email: item.email,
  //       firstname: item.firstname,
  //       lastname: item.lastname,
  //     };

  //     // console.log("Payload being sent:", payload);
  //     await axios.put(`/api/users/${item.id}`, payload);
  //     // const response = await axios.put(`/api/users/${item.id}`, payload);

  //     // console.log("Updated data:", response.data);

  //     //   fetchItems();
  //   } catch (err) {
  //     console.error("Error updating item:", err.response?.data || err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    // fetchItems();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div class="grid bg-gradient-to-tl from-blue-800 to-cyan-300 h-screen ">
        <header >
          <Nav_lec></Nav_lec>
        </header>
        <body className="bg-white rounded-md">
          <Spin spinning={isLoading}>
            <UserOutlined className="custom-icon" />
            <Typography.Title>Profile {user.firstname} :</Typography.Title>
            <UserTable data={[user]} onRowEdited={openModal} />

          </Spin>
          {/* <Button
          type="primary"
          htmlType="submit"
          onClick={handleChangedPassword}
        >
          Changed Password
        </Button> */}
        </body>
      </div>
    </ >
  );
}

export default UserPage;
