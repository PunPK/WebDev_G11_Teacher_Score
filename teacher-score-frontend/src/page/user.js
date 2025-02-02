// import Bar from "../components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth.context.js";
import ax from "../conf/ax.js";
import { Spin, Typography, Button } from "antd";
import axios from "axios";
import UserTable from "./UserTable";
import Nav_lec from "../components/navbar.js";
import { Card } from "@material-tailwind/react";
import defaultUserIcon from "../components/user-icon.webp";

function UserPage() {
  const [data, setData] = useState({});
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
  useEffect(() => {
    console.log(user);
  }, [user]);
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div class="bg-gradient-to-tl from-pink-700 to-teal-300 min-h-screen max-h-full top-0 mt-0 z-0">
        <Nav_lec className="z-50" />
        <div className=" my-52 place-self-center justify-center items-center">
          <Card className="bg-white rounded-md w-96 h-fit">
            <div className="my-4 mx-3">
              <Typography className="text-4xl font-extrabold items-start justify-start">
                {user.first_name} {user.last_name}'s profile:
              </Typography>
              <div className="flex justify-center mt-4">
                <img
                  src={
                    user.profile_picture?.url
                      ? `http://localhost:1337${user.profile_picture.url}`
                      : defaultUserIcon
                  }
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
              </div>
              <div className="mx-8">
                <Typography className="text-xl font-medium mt-6">
                  Name: {user.first_name} {user.last_name}
                </Typography>
                <Typography className="text-xl font-medium ">
                  Role: {user.userRole}
                </Typography>
                <Typography className="text-xl font-medium ">
                  Email: {user.email}
                </Typography>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default UserPage;
