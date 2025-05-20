import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, Tag, Button, Card, Typography, message } from "antd";
import { CheckOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import "../../styles/AdminDoc.css"

const { Title } = Typography;

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  //get users (unchanged)
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle account (unchanged)
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        {
          doctorId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      message.error("Error in account status");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <div className="doctor-info">
          <UserOutlined className="doctor-icon" />
          <span>{record.firstName + " " + record.lastName}</span>
        </div>
      ),
    },
    {
      title: "Contact",
      dataIndex: "phone",
      render: (phone) => <span className="contact-info">{phone}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === 'approved' ? 'green' : 'orange'} className="status-tag">
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="action-buttons">
          {record.status === "pending" ? (
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => handleAccountStatus(record, "approved")}
              className="approve-btn"
            >
              Approve
            </Button>
          ) : (
            <Button
              danger
              icon={<CloseOutlined />}
              onClick={() => handleAccountStatus(record, "blocked")}
              className="block-btn"
            >
              Block
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="doctors-container">
        <Card className="doctors-card">
          <Title level={3} className="page-title">Doctor Management</Title>
          <Table 
            columns={columns} 
            dataSource={doctors} 
            rowKey="_id"
            className="doctors-table"
            pagination={{ pageSize: 8 }}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default Doctors;