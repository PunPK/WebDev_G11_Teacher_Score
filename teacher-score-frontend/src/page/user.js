import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/Auth.context.js";
import Nav_lec from "../components/navbar.js";
import { Card, Typography } from "@material-tailwind/react";
import defaultUserIcon from "../components/user-icon.webp";

function UserPage() {
  const { state: ContextState } = useContext(AuthContext);
  const { user } = ContextState;

  useEffect(() => {}, [user]);

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
