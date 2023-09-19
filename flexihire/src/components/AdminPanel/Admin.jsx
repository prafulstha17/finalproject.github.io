import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Admin.css";
import Users from "./Users/Users";
import Dashboard from "./Dashboard/Dashboard";
import Mails from "./Mails/Mails";

function Admin() {
  return (
    <div className="admin">
      <div className="sidebar-align">
        <Sidebar />
      </div>
      <div className="body-align">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/mails" element={<Mails/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
