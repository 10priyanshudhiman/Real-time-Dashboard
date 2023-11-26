// Import necessary libraries
import React, { useEffect, useState } from "react";
import "./trucksensors-component.css";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillGearFill,
} from "react-icons/bs";

import io from "socket.io-client";

const TruckSensors = () => {
  const sampledata = [];
  //Define state to store received data
  const [data, setData] = useState([]);
  const socket = io("http://localhost:33334");

  // Listen for 'TRUCK-SENSORS' event
  useEffect(() => {
    const handleTruckSensorsEvent = (receivedData) => {
      const modifiedData = JSON.parse(receivedData.msg.value);
      setData((prevData) => [...prevData, modifiedData]);
    };
    socket.on("TRUCK-SENSORS", handleTruckSensorsEvent);
    return () => socket.off("TRUCK-SENSORS", handleTruckSensorsEvent);
  }, [socket]); // Empty dependency array ensures the effect runs once on mount

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>300</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>12</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>33</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>ALERTS</h3>
            <BsFillGearFill className="card_icon" />
          </div>
          <h1>42</h1>
        </div>
      </div>
      {console.log(data)}
      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="truck_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="engine_temperature"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="average_rpm"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="truck_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="engine_temperature"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="average_rpm" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default TruckSensors;
