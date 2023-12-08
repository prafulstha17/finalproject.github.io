import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Admin.css";
import Dashboard from "./Dashboard/Dashboard";
import Mails from "./Mails/Mails";
import ManagePost from "./ManagePost/ManagePost";
import UserProfiles from "./Users/UserProfiles";
import ThreeJSComponent from "./Root/ThreeJSComponent";
import Reports from "./Reports/Reports";

const Admin = () => {
  return (
    <div className="admin">
      <div className="sidebar-align">
        <Sidebar />
      </div>

      <div className="body-align">
        <Routes>
          <Route path="/" element={<ThreeJSComponent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/users" element={<UserProfiles />} />
          <Route path="/mails" element={<Mails />} />
          <Route
            path="/managepost"
            element={<ManagePost />}
            className="postManage"
          />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
