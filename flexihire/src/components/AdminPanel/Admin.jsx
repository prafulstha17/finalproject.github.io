import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Admin.css";
import Dashboard from "./Dashboard/Dashboard";

function Admin() {
  return (
    <div className="admin">
      <div className="sidebar-align">
        <Sidebar />
      </div>
      <div className="body-align">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
