import React, { useContext } from "react";
import { useSetState } from "react-use";

import { AuthContext } from "../context/Auth.context.js";

const initialState = {
  // For Test Only
  //student
  // username: "pong",
  // password: "123456",
  //lecturer
  username: "mickey",
  password: "123456",
};

export default function Login() {
  const { state: ContextState, login } = useContext(AuthContext);
  const { isLoginPending, isLoggedIn, loginError } = ContextState;
  const [state, setState] = useSetState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = state;
    login(username, password);
    setState({
      username: "",
      password: "",
    });
  };
  return (
    <div>
      <div class="flex w-full lg:w-screen justify-center items-center bg-gradient-to-bl from-jade-500 to-pink-700 space-y-8 h-screen">
        <div class="w-full px-8 md:px-32 lg:px-24">
          <form
            class="bg-white/90 bg-blend-saturation rounded-md shadow-2xl p-5 mx-96 backdrop-blur-sm drop-shadow-sm"
            name="loginForm"
            onSubmit={onSubmit}
          >
            <h1 class="text-black font-bold text-2xl mb-1">
              Welcome to Score anouncer
            </h1>
            <p class="text-sm font-normal text-gray-800 mb-8">
              Please sign in before using
            </p>
            <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-lg border-black h-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-black/100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id="email"
                class=" pl-2 w-full outline-none border-none bg-transparent"
                onChange={(e) => setState({ username: e.target.value })}
                value={state.username}
                type="text"
                name="email"
                placeholder="Email Address"
              />
            </div>
            <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-lg border-black h-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-black"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                class="pl-2 w-full outline-none border-none bg-transparent"
                onChange={(e) => setState({ password: e.target.value })}
                value={state.password}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>

            <div className="place-items-center ">
              <button
                type="submit"
                class=" items-end justify-end block w-32 mt-5 py-2 font-semibold mb-2 rounded-2xl text-white hover:bg-gradient-to-b hover:from-blue-900 hover:to-blue-700 bg-light-blue-800 hover:-translate-y-1 transition ease-in-out duration-300 delay-75"
                value="Login"
              >
                Login
              </button>
            </div>

            {isLoginPending && <div>Please wait...</div>}
            {isLoggedIn && <div>Success.</div>}
            {loginError && <div>{loginError.message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
