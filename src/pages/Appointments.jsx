import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Table, Tag, Card, Typography } from "antd";
import moment from "moment";

const { Title, Text } = Typography;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("https://vercel-backend-henna.vercel.app/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "Appointment ID",
      dataIndex: "_id",
      render: (id) => <Text type="secondary">{id.slice(0, 8)}...</Text>,
      width: 150,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <div className="datetime-cell">
          <Tag color="blue">{moment(record.date).format("YYYY-MM-DD")}</Tag>
          <Tag color="geekblue">{moment(record.time).format("HH:mm")}</Tag>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          color={
            status === "approved"
              ? "green"
              : status === "pending"
              ? "orange"
              : "red"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
      align: "center",
    },
  ];

  return (
    <Layout>
      <div className="appointments-container">
        <Card className="appointments-card">
          <Title level={3} className="page-title">
            Your Appointments
          </Title>
          <Text type="secondary" className="page-subtitle">
            View and manage your upcoming appointments
          </Text>

          <Table
            columns={columns}
            dataSource={appointments}
            className="appointments-table"
            rowKey="_id"
            pagination={{ pageSize: 6 }}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default Appointments;
