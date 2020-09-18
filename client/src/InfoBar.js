import React from 'react';
import "./InfoBar.css";

function InfoBar(props) {

  function handleLogout() {
    props.onLogout();
  }

  return (
    <div className="InfoBar">
      <span className="host">
        Logged in as <strong>{props.host.name}</strong>
      </span>
      <button className="btn-logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default InfoBar;