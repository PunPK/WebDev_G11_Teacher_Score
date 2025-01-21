import React, { useContext } from "react";

import { AuthContext } from "./context/Auth.context.js";
// import Login from "./Login/index.js";
// import Dashboard from "./Dashboard/index.js";
import LoginForm from "./page/login.js";
import Dashboard from "./page/dashboard.js";

const App = () => {
  const { state } = useContext(AuthContext);

  if (!state.isLoggedIn) return <LoginForm />;
  else return <Dashboard />;
};

export default App;
