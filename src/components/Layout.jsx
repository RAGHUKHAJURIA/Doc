import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "../Data/Data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge, Avatar, Tooltip } from "antd";
import {
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  HomeOutlined,
  CalendarOutlined,
  ProfileOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const menuIcons = {
  "fa-solid fa-house": <HomeOutlined />,
  "fa-solid fa-list-check": <CalendarOutlined />,
  "fa-solid fa-user": <UserOutlined />,
  "fa-solid fa-users": <TeamOutlined />,
  "fa-solid fa-cog": <SettingOutlined />,
};

function Layout({ children }) {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // Doctor menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list-check",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  // Rendering menu
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <div className="dashboard-container">
      {/* Premium Sidebar */}
      <div className="premium-sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <svg
              width="28"
              height="28"
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
          </div>
          <h2>Docly</h2>
        </div>

        <div className="sidebar-menu">
          {SidebarMenu.map((menu, index) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link to={menu.path} key={index}>
                <div className={`menu-item ${isActive ? "active" : ""}`}>
                  <div className="menu-icon">
                    {menuIcons[menu.icon] || <HomeOutlined />}
                  </div>
                  <span className="menu-text">{menu.name}</span>
                  {isActive && <div className="active-bar"></div>}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="sidebar-footer">
          <div className="user-card">
            <Avatar
              size={40}
              src={user?.profilePicture}
              className="user-avatar"
            >
              {user?.name?.charAt(0)}
            </Avatar>
            <div className="user-info">
              <h4>{user?.name}</h4>
              <p>
                {user?.isAdmin
                  ? "Administrator"
                  : user?.isDoctor
                  ? "Doctor"
                  : "Patient"}
              </p>
            </div>
            <Tooltip title="Logout">
              <button className="logout-btn" onClick={handleLogout}>
                <LogoutOutlined />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Elegant Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1 className="page-title">
              {SidebarMenu.find((item) => item.path === location.pathname)
                ?.name || "Dashboard"}
            </h1>
            <div className="welcome-message">
              Welcome back, {user?.name.split(" ")[0]}!
            </div>
          </div>

          <div className="header-actions">
            <Tooltip title="Notifications">
              <Badge
                count={user?.notification?.length}
                onClick={() => navigate("/notification")}
                className="notification-badge"
              >
                <div className="notification-icon">
                  <BellOutlined />
                </div>
              </Badge>
            </Tooltip>

            <div className="user-profile" onClick={() => navigate("/")}>
              <Avatar
                size={40}
                src={user?.profilePicture}
                className="profile-avatar"
              >
                {user?.name?.charAt(0)}
              </Avatar>
              <div className="profile-info">
                <span className="profile-name">{user?.name}</span>
                <span className="profile-role">
                  {user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="content-area">
          <div className="content-container">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
