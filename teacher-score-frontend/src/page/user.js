// import Bar from "../components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth.context.js";
import ax from "../conf/ax.js";
import { Spin, Typography, Button } from "antd";
import axios from "axios";
import UserTable from "./UserTable";
import "./user.css";
import Nav_lec from "../components/navbar.js";
import { Card } from "@material-tailwind/react";

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

  useEffect(() => {
    // fetchItems();
  }, []);

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
              <div class="relative self-center justify-self-center mt-10 mb-5 w-28 h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ring-2 ring-offset-2  ring-black">
                <svg class="absolute w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
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
    </ >
  );
}

export default UserPage;
