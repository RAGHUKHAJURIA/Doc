import React from "react";
import Layout from "./../components/Layout";
import {
  Col,
  Form,
  Input,
  Row,
  TimePicker,
  message,
  Card,
  Typography,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoadings, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";
import "../styles/Apply.css";

const { Title, Text } = Typography;

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle form (unchanged)
  const handleFinish = async (values) => {
    try {
      if (
        !values.timings ||
        !Array.isArray(values.timings) ||
        values.timings.length !== 2
      ) {
        message.error("Please select valid timings");
        return;
      }

      dispatch(showLoadings());
      const res = await axios.post(
        "https://vercel-backend-henna.vercel.app/api/v1/user/apply-doctor",
        {
          ...values,
          userId: user._id,
          timings: [
            values.timings[0].format("HH:mm"),
            values.timings[1].format("HH:mm"),
          ],
          feesPerCunsaltation: values.feesPerCunsaltation,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(
        error.response?.data?.message ||
          "Something Went Wrong. Please try again."
      );
    }
  };

  return (
    <Layout>
      <div className="apply-doctor-container">
        <Card className="form-card">
          <Title level={2} className="text-center mb-4">
            Doctor Application
          </Title>
          <Text className="subtitle text-center block mb-6">
            Fill out the form to apply as a doctor in our platform
          </Text>

          <Form layout="vertical" onFinish={handleFinish}>
            <div className="form-section">
              <Title level={4} className="section-title">
                Personal Details
              </Title>
              <Row gutter={24}>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    required
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Enter your first name"
                      className="form-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    required
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Enter your last name"
                      className="form-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item
                    label="Phone No"
                    name="phone"
                    required
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Enter your contact number"
                      className="form-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item
                    label="Email"
                    name="email"
                    required
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="form-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Website" name="website">
                    <Input
                      placeholder="Enter your website (optional)"
                      className="form-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item
                    label="Address"
                    name="address"
                    required
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Enter your clinic address"
                      className="form-input"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className="form-section">
              <Title level={4} className="section-title">
                Professional Details
              </Title>
              <Row gutter={24}>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item
                    label="Specialization"
                    name="specialization"
                    required
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Enter your specialization"
                      className="form-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item
                    label="Experience"
                    name="experience"
                    required
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Enter years of experience"
                      className="form-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item
                    label="Fees Per Consultation"
                    name="feesPerCunsaltation"
                    required
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Enter consultation fee"
                      className="form-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Timings" name="timings" required>
                    <TimePicker.RangePicker
                      format="HH:mm"
                      className="time-picker"
                      placeholder={["Start Time", "End Time"]}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={24} className="text-right">
                  <button className="submit-btn" type="submit">
                    Submit Application
                  </button>
                </Col>
              </Row>
            </div>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default ApplyDoctor;
