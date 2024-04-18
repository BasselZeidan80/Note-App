import React from "react";

export default function Sidebar() {
  return (
    <>
      <div
        className="w3-sidebar w3-bar-block w3-card w3-animate-left d-none"
        id="mySidebar"
      >
        <button className="w3-bar-item w3-button w3-large" onclick="w3_close()">
          Close &times;
        </button>
        <a href="#" className="w3-bar-item w3-button">
          Link 1
        </a>
        <a href="#" className="w3-bar-item w3-button">
          Link 2
        </a>
        <a href="#" className="w3-bar-item w3-button">
          Link 3
        </a>
      </div>

      <div id="main">
        <div className="w3-teal">
          <button
            id="openNav"
            className="w3-button w3-teal w3-xlarge"
            onclick="w3_open()"
          >
            &#9776;
          </button>
          <div className="w3-container">
            <h1>My Page</h1>
          </div>
        </div>
      </div>
    </>
  );
}
