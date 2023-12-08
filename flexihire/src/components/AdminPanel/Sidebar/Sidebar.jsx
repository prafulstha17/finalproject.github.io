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
          <button
            type="button"
            className="navbar-toggle collapsed"
            onClick={toggleSidebar}
            id="menu-toggle"
          >
            <i className="fa-solid fa-thumbtack"></i>
          </button>
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
                  <i className="fa fa-dashboard fa-stack-1x "></i>
                </span>{" "}
                <p>Dashboard</p>
              </a>
            </li>
            <li>
              <a href="/reports">
                <span className="fa-stack fa-lg pull-left">
                  <i className="fa fa-flag fa-stack-1x "></i>
                </span>
                <p>Reports</p>
              </a>
            </li>
            <li>
              <a href="/users">
                <span className="fa-stack fa-lg pull-left">
                  <i className="fa fa-cloud-download fa-stack-1x "></i>
                </span>
                <p>Users</p>
              </a>
            </li>
            <li>
              <a href="/mails">
                {" "}
                <span className="fa-stack fa-lg pull-left">
                  <i className="fa fa-cart-plus fa-stack-1x "></i>
                </span>
                <p>Mails</p>
              </a>
            </li>
            <li>
              <a href="/managepost">
                {" "}
                <span className="fa-stack fa-lg pull-left">
                  <i className="fa fa-wrench fa-stack-1x "></i>
                </span>
                <p>Manage Post</p>
              </a>
            </li>
          </ul>
        </div>
        <div className="admin-session">
          <div className="admin-logo">A</div>
          <a onClick={handleLogout}><p><i className="fa-solid fa-right-from-bracket fa-flip-horizontal"> </i></p> <p>Logout</p></a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
