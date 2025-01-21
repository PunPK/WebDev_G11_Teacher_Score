import React, { useContext, useEffect } from "react";

import { AuthContext } from "../context/Auth.context.js";
import ax from "../conf/ax.js";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate()
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     const result = await ax.get("/users");
  //     console.log(result.data);
  //   };
  //   fetchBooks();
  // }, []);
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;
  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="row">
      <div className="col-sm-8">
        <h1>Hello {user.email}</h1>
      </div>

      <div className="col-sm-4">
        <h1>
          <a href="/login" onClick={onLogout && navigate("/login")}>
            Logout
          </a>
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
