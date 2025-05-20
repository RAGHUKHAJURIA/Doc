import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout as AntLayout, Row, Col, Typography, Card } from "antd";
import Layout from "../components/Layout";
import DoctorList from "../components/DoctorList";
import "../styles/HomePage.css";

const { Title, Text } = Typography;

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  // login user data (unchanged)
  const getUserData = async () => {
    try {
      const res = await axios.get("https://vercel-backend-henna.vercel.app/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        
      }
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div className="home-page-container">
        {/* Header Section */}
        <div className="home-header">
          <Title level={2} className="main-title">
            Welcome to Our Medical Portal
          </Title>
          <Text className="sub-title">
            Find and book appointments with our specialist doctors
          </Text>
        </div>

        {/* Doctors Grid */}
        <div className="doctors-grid-section">
          <Title level={3} className="section-title">
            Available Doctors
          </Title>
          <Row gutter={[16, 16]}>
            {doctors &&
              doctors.map((doctor) => (
                <Col xs={24} sm={12} md={8} lg={6} key={doctor._id}>
                  <div className="doctor-card-wrapper">
                    <DoctorList doctor={doctor} />
                  </div>
                </Col>
              ))}
          </Row>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <Card className="stats-card">
            <Row justify="space-around">
              <Col span={8} className="stat-item">
                <Title level={3} className="stat-value">
                  {doctors.length}+
                </Title>
                <Text className="stat-label">Doctors</Text>
              </Col>
              <Col span={8} className="stat-item">
                <Title level={3} className="stat-value">
                  24/7
                </Title>
                <Text className="stat-label">Availability</Text>
              </Col>
              <Col span={8} className="stat-item">
                <Title level={3} className="stat-value">
                  100%
                </Title>
                <Text className="stat-label">Verified</Text>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
