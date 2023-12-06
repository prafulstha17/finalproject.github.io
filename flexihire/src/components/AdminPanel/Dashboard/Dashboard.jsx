import React, { useState } from "react";
import "./Dashboard.css";
import Clock from "./Clock";
import Calendar from "./Calendar";
import WorldMap from "./WorldMap";

function Dashboard() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="dashboard">
      <Clock />
      <Calendar />
      <WorldMap/>
    </div>
  );
}

export default Dashboard;
