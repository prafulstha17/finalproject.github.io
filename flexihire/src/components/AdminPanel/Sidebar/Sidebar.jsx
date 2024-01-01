import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import "./Sidebar.css";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <navbar className="navbar navbar-default no-margin">
        <div className="navbar-header fixed-brand">
          <a className="navbar-brand" href="/">
            <i className="fa-brands fa-redhat"></i>
            <p> Admin</p>
          </a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li className="active">
              <button
                className="navbar-toggle collapse in"
                onClick={toggleSidebar}
                id="menu-toggle-2"
              >
                {" "}
                <span
                  className="glyphicon glyphicon-th-large"
                  aria-hidden="true"
                ></span>
              </button>
            </li>
          </ul>
        </div>
      </navbar>
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav nav-pills nav-stacked" id="menu">
            <li className="active">
              <a href="/dashboard">
                <span className="fa-stack fa-lg pull-left">
                  <i class="fa-solid fa-table-columns"></i>
                </span>{" "}
                <p>Dashboard</p>
              </a>
            </li>
            <li>
              <a href="/reports">
                <span className="fa-stack fa-lg pull-left">
                  <i class="fa-solid fa-flag-checkered"></i>
                </span>
                <p>Reports</p>
              </a>
            </li>
            <li>
              <a href="/users">
                <span className="fa-stack fa-lg pull-left">
                  <i class="fa fa-solid fa-users"></i>
                </span>
                <p>Users</p>
              </a>
            </li>
            <li>
              <a href="/mails">
                {" "}
                <span className="fa-stack fa-lg pull-left">
                  <i class="fa-solid fa-envelopes-bulk"></i>
                </span>
                <p>Mails</p>
              </a>
            </li>
            <li>
              <a href="/managepost">
                {" "}
                <span className="fa-stack fa-lg pull-left">
                  <i class="fa-solid fa-signs-post"></i>
                </span>
                <p>Manage Post</p>
              </a>
            </li>
          </ul>
        </div>
        <div className="admin-session">
          <div className="admin-logo"><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fportalinfotec.com%2Fwp-content%2Fuploads%2F2021%2F04%2F20141031772049.jpg&f=1&nofb=1&ipt=f6f12c4a79e7dce8e86f97d3140e1e4effefe8791401a7c4ef09bb6d26a87ecc&ipo=images" alt="A" /></div>
          <a onClick={handleLogout}><p><i className="fa-solid fa-right-from-bracket fa-flip-horizontal"> </i></p> <p>Logout</p></a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
