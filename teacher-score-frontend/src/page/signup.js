import { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import axios from "axios";
// import dayjs from "dayjs";
import { DingdingOutlined } from "@ant-design/icons";

const URL_AUTH = "/api/auth/local";

export default function Signup(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberme, setRememberme] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      setErrMsg(null);

      const response = await axios.post(URL_AUTH, { ...formData });
      const token = response.data.jwt;
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

      if (rememberme) {
        localStorage.setItem("username", formData.identifier);
        localStorage.setItem("password", formData.password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }

      props.onLoginSuccess();
    } catch (err) {
      setErrMsg(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (formData) => {
    try {
      setIsLoading(true);
      setErrMsg(null);

      const response = await axios.post("/api/auth/local/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log("Signup Success:", response.data);
      props.onSignupSuccess();
    } catch (err) {
      setErrMsg(
        err.response?.data?.message || "An error occurred during sign up"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSignup = () => setIsSignup(!isSignup);

  return (
    <div className="login-container">
      <DingdingOutlined className="custom-icon" />
      <h1>{isSignup ? "Sign Up" : "Login"}</h1>
      <Form
        onFinish={(formData) =>
          isSignup ? handleSignup(formData) : handleLogin(formData)
        }
        autoComplete="off"
        initialValues={{
          identifier: username,
          password: password,
        }}
      >
        {errMsg && (
          <Form.Item>
            <Alert message={errMsg} type="error" />
          </Form.Item>
        )}

        {isSignup && (
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
        )}

        <Form.Item
          label="Username"
          name={isSignup ? "username" : "identifier"}
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        {isSignup && (
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item>
          {!isSignup && (
            <input
              type="checkbox"
              checked={rememberme}
              onChange={(e) => setRememberme(e.target.checked)}
            />
          )}
          {!isSignup && <span style={{ marginLeft: 8 }}>Remember Me</span>}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="link" onClick={toggleSignup}>
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
