import React from "react";
import { Form, Input, message, Button } from "antd";
import "@ant-design/v5-patch-for-react-19";
import "../styles/RegisterStyles.css";
import { useDispatch } from "react-redux";
import { showLoadings, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // form handler function (unchanged)
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoadings());
      const res = await axios.post("https://vercel-backend-henna.vercel.app/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully");
        navigate("/login");
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
          <h3 className="auth-title">Create Account</h3>
          <p className="auth-subtitle">Join our healthcare community</p>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="auth-form"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              prefix={<UserOutlined className="form-input-icon" />}
              placeholder="Full Name"
              size="large"
              className="form-input"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              prefix={<MailOutlined className="form-input-icon" />}
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
              Register
            </Button>
          </Form.Item>

          <div className="auth-footer">
            <span>Already have an account? </span>
            <Link to="/login" className="auth-link">
              Login Here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
