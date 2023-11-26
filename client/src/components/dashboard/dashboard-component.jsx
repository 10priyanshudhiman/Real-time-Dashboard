// Import necessary libraries
import React, { useState } from "react";
import "./dashboard-component.css";
import Header from "../header/header-component";
import Sidebar from "../siderbar/sidebar-component";
import TruckSensors from "../trucksensors/trucksensors-component";

const Dashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <TruckSensors />
    </div>
  );
};

export default Dashboard;
