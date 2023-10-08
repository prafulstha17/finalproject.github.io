import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="loading-session">
      <div className="loader">
        <div className="circles">
          <div></div>
          <div></div>
          <div></div>
          <span></span>
        </div>
        <div className="loader-text">
          <h2>Flexihire</h2>
          <h2>Flexihire</h2>
        </div>
      </div>
    </div>
  );
}

export default Loading;
