import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import moment from "moment";
import { message, Table, Card, Tag, Typography, Button, Badge } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "../../styles/DoctorAppointment.css";

const { Title, Text } = Typography;

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "https://vercel-backend-henna.vercel.app/api/v1/doctor/doctor-appointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "https://vercel-backend-henna.vercel.app/api/v1/doctor/update-status",
        {
          appointmentId: record._id,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.error("Update error:", error);
      message.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const columns = [
    {
      title: "Appointment ID",
      dataIndex: "_id",
      render: (id) => <Text type="secondary">{id.slice(0, 8)}...</Text>,
      width: 120,
    },
    {
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => (
        <div className="patient-info">
          <Text strong>{record.userInfo?.name}</Text>
          <Text type="secondary">{record.userInfo?.email}</Text>
        </div>
      ),
    },
    {
      title: "Contact",
      dataIndex: "phone",
      render: (text, record) => <Text>{record.userInfo?.phone}</Text>,
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
      render: (status) => {
        let color = "default";
        let icon = <ClockCircleOutlined />;

        if (status === "approved") {
          color = "green";
          icon = <CheckOutlined />;
        } else if (status === "rejected") {
          color = "red";
          icon = <CloseOutlined />;
        } else if (status === "pending") {
          color = "orange";
        }

        return (
          <Tag color={color} icon={icon}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="action-buttons">
          {record.status === "pending" && (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleStatus(record, "approved")}
                className="approve-btn"
              >
                Approve
              </Button>
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => handleStatus(record, "reject")}
                className="reject-btn"
              >
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="doctor-appointments-container">
        <Card className="appointments-card">
          <div className="appointments-header">
            <Title level={3}>Appointment Management</Title>
            <Text type="secondary">Review and manage patient appointments</Text>
          </div>

          <Table
            columns={columns}
            dataSource={appointments}
            rowKey="_id"
            className="appointments-table"
            pagination={{ pageSize: 8 }}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default DoctorAppointments;
