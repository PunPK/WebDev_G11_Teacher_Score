import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { useNavigate } from "react-router";
import { Typography } from "@material-tailwind/react";
import { Disclosure, DisclosureButton } from '@headlessui/react';
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export default function Nav_lec() {
    const { state: ContextState, logout } = useContext(AuthContext);
    const { user } = ContextState;
    const navigate = useNavigate()
    const onLogout = (e) => {
        e.preventDefault();
        logout();
        navigate("/")
    };
    console.log(user)

    useEffect(() => {
        if (user) {

        } else {

        }
    }, [user]);

    return (
        <header className="bg-white/90 drop-shadow-sm  w-full h-1/6 sticky z-20 top-0 md:w-auto">
            <div id="sticky-banner" tabIndex="-1 n" className=" max-w-7xl w-full  mx-auto px-2 sm:px-6 lg:px-8  ">
                <div className=" flex items-center mx-6 h-12 justify-between">
                    <div className="flex inset-y-0 left-0 items-center sm:hidden">
                        <Typography>
                            Hello {user.userRole}, {user.first_name} {user.last_name}
                        </Typography>
                        <div className="flex ml-3">
                            <button onClick={() => navigate("/")} className="flex-initial mx-3 group relative inline-flex items-center justify-center rounded-md p-2 text-indigo-500 hover:text-indigo-700 w-auto h-8 bg-transparent focus:outline-none focus:underline-offset-8">
                                <svg class="h-5 w-5 " width="20" height="20" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                                </svg><Typography className="translate-y-0.5 ml-0.5"> Home</Typography>
                            </button>

                            <button onClick={() => navigate("/user")} className="flex-initial mx-3 group relative inline-flex items-center justify-center rounded-md p-2 text-indigo-500 hover:text-indigo-700 w-auto h-8 bg-transparent focus:outline-none focus:underline-offset-8">
                                <svg class="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg><Typography className="translate-y-0.5 ml-0.5"> User</Typography>
                            </button>
                        </div>
                    </div>


                    <div className="absolute inset-y-0 flex right-0 items-center pr-2 mr-4 my-auto">
                        <button onClick={onLogout} className="items-center  bg-white text-black hover: hover:ring-black left-0 w-18 rounded-lg h-7 my-auto">
                            <a href="/" className="text-black">
                                Logout
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )

}
