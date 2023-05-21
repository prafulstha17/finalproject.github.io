import React from "react";
import "./Dashboard.css";

function Dashboard(){

    return(
            <div className="dashboard">
                <div class="col-sm-12 col-md-6 col-xl-4">
                        <div class="h-100 bg-secondary rounded p-4">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <h6 class="mb-0">Calender</h6>
                                <a href="">Show All</a>
                            </div>
                            <div id="calender"></div>
                        </div>
                    </div>
            </div>
        )
}

export default Dashboard;