import React, { useContext } from "react";
import { useSetState } from "react-use";

import { AuthContext } from "../context/Auth.context.js";

const initialState = {
  lecturer: { username: "pong", password: "123456" },
  student: { username: "mickey", password: "123456" },
};

export default function Login() {
  const { state: ContextState, login } = useContext(AuthContext);
  const { isLoginPending, isLoggedIn, loginError } = ContextState;
  const [state, setState] = useSetState(initialState);

  const onLecturerSubmit = (e) => {
    e.preventDefault();
    const { username = "", password = "" } = state.lecturer || {};
    login(username, password);
    setState({ lecturer: { username: "", password: "" } });
  };

  const onStudentSubmit = (e) => {
    e.preventDefault();
    const { username = "", password = "" } = state.student || {};
    login(username, password);
    setState({ student: { username: "", password: "" } });
  };

  return (
    <div>
      <div className="h-screen flex">
        {/* Left Section: Lecturer Login */}
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-gray-100 space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form
              className="bg-white rounded-md shadow-2xl p-5"
              name="lecturerLoginForm"
              onSubmit={onLecturerSubmit}
            >
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Lecturer Login
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-8">
                Login as a Lecturer
              </p>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <input
                  id="lecturer-email"
                  className="pl-2 w-full outline-none border-none"
                  onChange={(e) =>
                    setState({
                      lecturer: { ...state.lecturer, username: e.target.value },
                    })
                  }
                  value={state.lecturer?.username || ""}
                  type="text"
                  placeholder="Email Address"
                />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl">
                <input
                  id="lecturer-password"
                  className="pl-2 w-full outline-none border-none"
                  onChange={(e) =>
                    setState({
                      lecturer: { ...state.lecturer, password: e.target.value },
                    })
                  }
                  value={state.lecturer?.password || ""}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              >
                Login
              </button>
              {isLoginPending && <div>Please wait...</div>}
              {isLoggedIn && <div>Success.</div>}
              {loginError && <div>{loginError.message}</div>}
            </form>
          </div>
        </div>

        {/* Right Section: Student Login */}
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form
              className="bg-white rounded-md shadow-2xl p-5"
              name="studentLoginForm"
              onSubmit={onStudentSubmit}
            >
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Student Login
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-8">
                Login as a Student
              </p>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <input
                  id="student-email"
                  className="pl-2 w-full outline-none border-none"
                  onChange={(e) =>
                    setState({
                      student: { ...state.student, username: e.target.value },
                    })
                  }
                  value={state.student?.username || ""}
                  type="text"
                  placeholder="Email Address"
                />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl">
                <input
                  id="student-password"
                  className="pl-2 w-full outline-none border-none"
                  onChange={(e) =>
                    setState({
                      student: { ...state.student, password: e.target.value },
                    })
                  }
                  value={state.student?.password || ""}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="block w-full bg-green-600 mt-5 py-2 rounded-2xl hover:bg-green-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              >
                Login
              </button>
              {isLoginPending && <div>Please wait...</div>}
              {isLoggedIn && <div>Success.</div>}
              {loginError && <div>{loginError.message}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
