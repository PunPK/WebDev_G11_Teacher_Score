import React, { useContext } from "react";

import { AuthContext } from "./context/Auth.context.js";
// import Login from "./Login";
// import Dashboard from "./Dashboard";
import HomePage from "./page/home.js";
import LoginScreen from "./page/login.js";

const App = () => {
  const { state } = useContext(AuthContext);

  if (!state.isLoggedIn) return <LoginScreen />;
  else return <HomePage />;
};

export default App;
