// Import necessary libraries
import React, { useEffect, useState } from "react";
import "./trucksensors1-component.css";

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

const TruckSensors1 = () => {
  //Define state to store received data
  const [data, setData] = useState(() => {
    // Initialize state from localStorage on component mount
    const storedData = localStorage.getItem("truckSensors1Data");
    try {
      // Try parsing the stored data as JSON
      const parsedData = JSON.parse(storedData);

      // Check if the parsed data is an array
      if (Array.isArray(parsedData)) {
        return parsedData; // If it's an array, use it as is
      } else if (parsedData) {
        // If it's not an array, create an array with the single item
        return [parsedData];
      } else {
        return []; // If parsing fails or data is null/undefined, use an empty array
      }
    } catch (error) {
      console.error("Error parsing stored data:", error);
      return []; // Handle parsing error by using an empty array
    }
  });
  const socket = io("http://localhost:33334");

  // Listen for 'TRUCK-1-SENSORS' event
  useEffect(() => {
    const handleTruckSensors1Event = (receivedData) => {
      const modifiedData = JSON.parse(receivedData.msg.value);
      setData((prevData) => {
        const newData = [...prevData, modifiedData];
        // Store updated data in localStorage
        localStorage.setItem("truckSensors1Data", JSON.stringify(newData));
        return newData;
      });
    };

    socket.on("TRUCK-1-SENSORS", handleTruckSensors1Event);
    return () => {
      socket.off("TRUCK-1-SENSORS", handleTruckSensors1Event);
    };
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
            <XAxis dataKey="READTIME" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="ENGINE_TEMPERATURE"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="AVERAGE_RPM"
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
            <XAxis dataKey="READTIME" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ENGINE_TEMPERATURE"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="AVERAGE_RPM" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default TruckSensors1;
