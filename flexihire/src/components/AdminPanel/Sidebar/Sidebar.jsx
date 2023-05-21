import React, { useState } from "react";
import {auth} from "../../../confg/firebase";
import "./Sidebar.css";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <navbar class="navbar navbar-default no-margin">
        <div class="navbar-header fixed-brand">
          <a class="navbar-brand" href="#">
            <i class="fa-brands fa-redhat"></i>
            <p> Admin</p>
          </a>
          <button
            type="button"
            class="navbar-toggle collapsed"
            onClick={toggleSidebar}
            id="menu-toggle"
          >
            <i class="fa-solid fa-thumbtack"></i>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="active">
              <button
                class="navbar-toggle collapse in"
                onClick={toggleSidebar}
                id="menu-toggle-2"
              >
                {" "}
                <span
                  class="glyphicon glyphicon-th-large"
                  aria-hidden="true"
                ></span>
              </button>
            </li>
          </ul>
        </div>
      </navbar>
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul class="sidebar-nav nav-pills nav-stacked" id="menu">
            <li class="active">
              <a href="/dashboard">
                <span class="fa-stack fa-lg pull-left">
                  <i class="fa fa-dashboard fa-stack-1x "></i>
                </span>{" "}
                <p>Dashboard</p>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="fa-stack fa-lg pull-left">
                  <i class="fa fa-flag fa-stack-1x "></i>
                </span>
                <p>Shortcut</p>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="fa-stack fa-lg pull-left">
                  <i class="fa fa-cloud-download fa-stack-1x "></i>
                </span>
                <p>Users</p>
              </a>
            </li>
            <li>
              <a href="#">
                {" "}
                <span class="fa-stack fa-lg pull-left">
                  <i class="fa fa-cart-plus fa-stack-1x "></i>
                </span>
                <p>Events</p>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="fa-stack fa-lg pull-left">
                  <i class="fa fa-wrench fa-stack-1x "></i>
                </span>
                <p>Services</p>
              </a>
            </li>
          </ul>
        </div>
        <div className="admin-session">
          <div className="admin-logo">A</div>
          <a onClick={handleLogout}><i class="fa-solid fa-right-from-bracket fa-flip-horizontal"> </i> <p>Logout</p></a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
