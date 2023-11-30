// Import necessary libraries
import React, { useState } from "react";
import "./dashboard-component.css";
import Header from "../header/header-component";
import Sidebar from "../siderbar/sidebar-component";
import TruckSensors from "../trucksensors/trucksensors-component";
import TruckSensors1 from "../trucksensors1/trucksensors1-component";
import TruckSensors2 from "../trucksensors2/trcuksensors2-component";
import TruckSensors3 from "../trucksensors3/trucksensors3-component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Dashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />

      <Router>
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TruckSensors />
              </>
            }
          ></Route>
          <Route
            path="/truck1"
            element={
              <>
                <TruckSensors1 />
              </>
            }
          ></Route>
          <Route
            path="/truck2"
            element={
              <>
                <TruckSensors2 />
              </>
            }
          ></Route>
          <Route
            path="/truck3"
            element={
              <>
                <TruckSensors3 />
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default Dashboard;
