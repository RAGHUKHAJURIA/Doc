import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, Tag, Card, Typography, Button } from "antd";
import { MailOutlined, UserOutlined, CloseOutlined } from "@ant-design/icons";
import "../../styles/AdminUser.css";

const { Title, Text } = Typography;

const Users = () => {
  const [users, setUsers] = useState([]);

  //get users (unchanged)
  const getUsers = async () => {
    try {
      const res = await axios.get("https://vercel-backend-henna.vercel.app/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "User",
      dataIndex: "name",
      render: (text, record) => (
        <div className="user-info">
          <UserOutlined className="user-icon" />
          <Text strong>{record.name}</Text>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email) => (
        <div className="email-info">
          <MailOutlined className="email-icon" />
          <Text>{email}</Text>
        </div>
      ),
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (isDoctor) => (
        <Tag color={isDoctor ? "green" : "orange"} className="doctor-tag">
          {isDoctor ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <Button danger icon={<CloseOutlined />} className="block-btn">
          Block
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <div className="users-container">
        <Card className="users-card">
          <Title level={3} className="page-title">
            User Management
          </Title>
          <Text type="secondary" className="page-subtitle">
            Manage all registered users
          </Text>
          <Table
            columns={columns}
            dataSource={users}
            rowKey="_id"
            className="users-table"
            pagination={{ pageSize: 8 }}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default Users;
