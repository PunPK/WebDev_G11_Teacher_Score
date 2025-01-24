import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { useNavigate } from "react-router";

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
        <nav className="w-auto h-12 drop-shadow-md bg-white-100 items-start justify-start mx-0 top-0 mt-0">
            <div className="flex my-2 top-0 mt-0 mb-0">
                <button onClick={onLogout} className=" items-end justify-self-end bg-blue-600 text-white-100 hover:bg-light-blue-900 left-0 w-16 rounded-lg">

                    Logout

                </button>
            </div>
        </nav>
    )

}
