import React, { useState } from "react";
// import Calendar from "react-calendar";
import "./Dashboard.css";

function Dashboard() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="dashboard">
      {/* <div class="col-sm-12 col-md-6 col-xl-4">
        <div class="h-100 bg-secondary rounded p-4">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <h6 class="mb-0">Calendar</h6>
            <a href="">Show All</a>
          </div>
           <Calendar value={date} onChange={setDate} /> 
        </div>
      </div> */}

      {/* Feed section */}
      
    </div>
  );
}

export default Dashboard;
