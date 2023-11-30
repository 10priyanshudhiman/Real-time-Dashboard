// Import necessary libraries
import React from "react";
import "./sidebar-component.css";
import { Link } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>
      <ul className="sidebar-list">
        <Link to="/" className="sidebar-link">
          <li className="sidebar-list-item">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </li>
        </Link>
        <Link to="/truck1" className="sidebar-link">
          <li className="sidebar-list-item">
            <BsFillArchiveFill className="icon" /> TRUCK-1
          </li>
        </Link>
        <Link to="/truck2" className="sidebar-link">
          <li className="sidebar-list-item">
            <BsFillGrid3X3GapFill className="icon" /> TRCUK-2
          </li>
        </Link>
        <Link to="/truck3" className="sidebar-link">
          <li className="sidebar-list-item">
            <BsPeopleFill className="icon" /> TRUCK-3
          </li>
        </Link>
        <Link to="/inventory" className="sidebar-link">
          <li className="sidebar-list-item">
            <BsListCheck className="icon" /> Inventory
          </li>
        </Link>
        <Link to="/reports" className="sidebar-link">
          <li className="sidebar-list-item">
            <BsMenuButtonWideFill className="icon" /> Reports
          </li>
        </Link>
        <Link to="/settings" className="sidebar-link">
          <li className="sidebar-list-item">
            <BsFillGearFill className="icon" /> Settings
          </li>
        </Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
