import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { useNavigate } from "react-router";
import { Typography } from "@material-tailwind/react";
import { Disclosure, DisclosureButton } from '@headlessui/react';
import { NavLink } from "react-router-dom";

export default function Nav_lec() {
    const { state: ContextState, logout } = useContext(AuthContext);
    const { user } = ContextState;
    const navigate = useNavigate()
    const onLogout = (e) => {
        e.preventDefault();
        logout();
        navigate("/")
    };


    return (
        <header className="bg-white/90 drop-shadow-sm  w-full h-12 sticky z-20 top-0">
            <div id="sticky-banner" tabIndex="-1 n" className=" max-w-7xl w-full  mx-auto px-2 sm:px-6 lg:px-8  ">
                <div className=" flex items-center mx-6 h-12 justify-between">
                    <div className="flex inset-y-0 left-0 items-center sm:hidden">
                        <Typography>
                            Hello, Lecturer {user.username}
                        </Typography>
                        <div className="flex ml-3">
                            <NavLink to={"/"} className="flex-initial mx-3 group relative inline-flex items-center justify-center rounded-md p-2 text-indigo-500 hover:text-indigo-700 w-auto h-8 bg-transparent focus:outline-none focus:underline-offset-8">
                                <span onClick={navigate("/")}>Home</span>
                            </NavLink>
                            <NavLink to={"/user"} className="flex-initial mx-3 group relative inline-flex items-center justify-center rounded-md p-2 text-indigo-500 hover:text-indigo-700 w-auto h-8 bg-transparent focus:outline-none focus:underline-offset-8">
                                User
                            </NavLink>
                        </div>
                    </div>



                    <div className="absolute inset-y-0 flex right-0 items-center pr-2">
                        <button onClick={onLogout} className="items-center  bg-blue-600 text-white hover: hover:bg-light-blue-900 left-0 w-16 rounded-lg">

                            Logout

                        </button>
                    </div>
                </div>
            </div>
        </header>
    )

}
