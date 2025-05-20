import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Row, Col, message, Card, Typography, Button } from "antd";
import { showLoadings, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";
import DatePicker from "react-datepicker";
import "../../styles/Profile.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  StarOutlined,
  DollarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // Update form (unchanged)
  const handleFinish = async (values) => {
    try {
      dispatch(showLoadings());
      const res = await axios.post(
        "https://vercel-backend-henna.vercel.app/api/v1/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(startTime).format("HH:mm"),
            moment(endTime).format("HH:mm"),
          ],
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
      console.log(error);
      message.error("Something went wrong");
    }
  };

  // Get doctor info (unchanged)
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "https://vercel-backend-henna.vercel.app/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
        setStartTime(moment(res.data.data.timings[0], "HH:mm").toDate());
        setEndTime(moment(res.data.data.timings[1], "HH:mm").toDate());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  return (
    <Layout>
      <div className="profile-container">
        <Card className="profile-card">
          <Title level={3} className="profile-title">
            Doctor Profile
          </Title>
          <Text className="profile-subtitle">
            Update your personal and professional information
          </Text>

          {doctor && (
            <Form
              layout="vertical"
              onFinish={handleFinish}
              initialValues={{
                ...doctor,
                timings: [
                  moment(doctor.timings[0], "HH:mm"),
                  moment(doctor.timings[1], "HH:mm"),
                ],
              }}
            >
              <Card className="form-section-card" title="Personal Details">
                <Row gutter={24}>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[
                        { required: true, message: "First name is required" },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Enter first name"
                        className="form-input"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[
                        { required: true, message: "Last name is required" },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Enter last name"
                        className="form-input"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item
                      label="Phone No"
                      name="phone"
                      rules={[
                        { required: true, message: "Phone No is required" },
                      ]}
                    >
                      <Input
                        prefix={<PhoneOutlined />}
                        placeholder="Enter Phone No"
                        className="form-input"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, message: "Email is required" }]}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="Enter email"
                        className="form-input"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item label="Website" name="website">
                      <Input
                        prefix={<GlobalOutlined />}
                        placeholder="Enter website"
                        className="form-input"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[{ required: true, message: "Address required" }]}
                    >
                      <Input
                        prefix={<EnvironmentOutlined />}
                        placeholder="Enter your address"
                        className="form-input"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card className="form-section-card" title="Professional Details">
                <Row gutter={24}>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item
                      label="Specialization"
                      name="specialization"
                      rules={[
                        {
                          required: true,
                          message: "Specialization is required",
                        },
                      ]}
                    >
                      <Input
                        prefix={<StarOutlined />}
                        placeholder="Your Specialization"
                        className="form-input"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item
                      label="Experience"
                      name="experience"
                      rules={[
                        { required: true, message: "Experience is required" },
                      ]}
                    >
                      <Input
                        placeholder="Your experience"
                        className="form-input"
                        addonAfter="years"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                    <Form.Item
                      label="Fees Per Consultation"
                      name="feesPerCunsaltation"
                      rules={[
                        {
                          required: true,
                          message: "Fees Per Consultation is required",
                        },
                      ]}
                    >
                      <Input
                        prefix={<DollarOutlined />}
                        placeholder="Fees Per Consultation"
                        className="form-input"
                        addonAfter="USD"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={12}>
                    <Form.Item label="Timings" required>
                      <div className="time-picker-container">
                        <div className="time-picker-group">
                          <ClockCircleOutlined className="time-picker-icon" />
                          <DatePicker
                            selected={startTime}
                            onChange={(date) => setStartTime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Start Time"
                            dateFormat="HH:mm"
                            placeholderText="Start Time"
                            className="custom-timepicker"
                          />
                        </div>
                        <span className="time-separator">to</span>
                        <div className="time-picker-group">
                          <ClockCircleOutlined className="time-picker-icon" />
                          <DatePicker
                            selected={endTime}
                            onChange={(date) => setEndTime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="End Time"
                            dateFormat="HH:mm"
                            placeholderText="End Time"
                            className="custom-timepicker"
                          />
                        </div>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <div className="form-actions">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="update-btn"
                >
                  Update Profile
                </Button>
              </div>
            </Form>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
