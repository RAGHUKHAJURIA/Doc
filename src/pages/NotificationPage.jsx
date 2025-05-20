import React from "react";
import Layout from "../components/Layout";
import { Tabs, message, Card, Tag, Typography, Button, Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoadings, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BellOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import "../styles/Notification.css";
import { setUser } from "../redux/features/userSlice";

const { Title, Text } = Typography;

const NotificationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoadings());
      const res = await axios.post(
        "https://vercel-backend-henna.vercel.app/api/v1/user/get-all-notification",
        {
          userId: user._id,
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

        dispatch(
          setUser({
            ...user,
            notification: [],
            seennotification: [...user.seennotification, ...user.notification],
          })
        );
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoadings());
      const res = await axios.post(
        "https://vercel-backend-henna.vercel.app/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);

        dispatch(
          setUser({
            ...user,
            seennotification: [],
          })
        );
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error("Something went wrong in notification");
    }
  };
  const items = [
    {
      key: "1",
      label: (
        <Badge count={user?.notification?.length} offset={[10, -5]}>
          <span>Unread</span>
        </Badge>
      ),
      children: (
        <div className="notification-tab">
          <div className="notification-actions">
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleMarkAllRead}
            >
              Mark All Read
            </Button>
          </div>
          <div className="notification-list">
            {user?.notification?.map((notificationMsg, index) => (
              <Card
                key={notificationMsg._id || index}
                className="notification-card unread"
                hoverable
              >
                <div className="notification-content">
                  <BellOutlined className="notification-icon" />
                  <Text>{notificationMsg.message}</Text>
                  <Tag color="orange" className="notification-status">
                    New
                  </Tag>
                </div>
              </Card>
            ))}
            {user?.notification?.length === 0 && (
              <div className="empty-notification">
                <Text type="secondary">No unread notifications</Text>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Read",
      children: (
        <div className="notification-tab">
          <div className="notification-actions">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </Button>
          </div>
          <div className="notification-list">
            {user?.seennotification?.map((notificationMsg, index) => (
              <Card
                key={notificationMsg._id || index}
                className="notification-card read"
                hoverable
              >
                <div className="notification-content">
                  <BellOutlined className="notification-icon" />
                  <Text>{notificationMsg.message}</Text>
                  <Tag color="green" className="notification-status">
                    Read
                  </Tag>
                </div>
              </Card>
            ))}
            {user?.seennotification?.length === 0 && (
              <div className="empty-notification">
                <Text type="secondary">No read notifications</Text>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="notification-page">
        <Card className="notification-container">
          <div className="notification-header">
            <Title level={3} className="page-title">
              <BellOutlined /> Notifications
            </Title>
            <Text type="secondary">
              Manage your notifications and stay updated
            </Text>
          </div>
          <Tabs
            items={items}
            className="notification-tabs"
            tabBarStyle={{ padding: "0 24px" }}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default NotificationPage;
