import React from "react";
import { Form, Input, message, Button } from "antd";
import "../styles/RegisterStyles.css";
import { useDispatch } from "react-redux";
import { showLoadings, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "antd/dist/reset.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoadings());
      const res = await axios.post("https://vercel-backend-henna.vercel.app/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <svg
              width="40"
              height="40"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z"
                fill="#3B82F6"
              />
              <path
                d="M21 12H18V9C18 8.448 17.552 8 17 8H15C14.448 8 14 8.448 14 9V12H11C10.448 12 10 12.448 10 13V15C10 15.552 10.448 16 11 16H14V19C14 19.552 14.448 20 15 20H17C17.552 20 18 19.552 18 19V16H21C21.552 16 22 15.552 22 15V13C22 12.448 21.552 12 21 12Z"
                fill="white"
              />
            </svg>
            <h2>Docly</h2>
          </div>
          <h3 className="auth-title">Welcome Back</h3>
          <p className="auth-subtitle">Please login to your account</p>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="auth-form"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              prefix={<UserOutlined className="form-input-icon" />}
              placeholder="Email address"
              size="large"
              className="form-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="form-input-icon" />}
              placeholder="Password"
              size="large"
              className="form-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="auth-btn"
              block
            >
              Sign In
            </Button>
          </Form.Item>

          <div className="auth-footer">
            <span>Don't have an account? </span>
            <Link to="/register" className="auth-link">
              Create Account
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
