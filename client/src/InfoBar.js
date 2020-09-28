import React from 'react';
import "./InfoBar.css";

function InfoBar(props) {

  function handleLogout() {
    props.onLogout();
  }

  function showUserList() {
    props.onShowUserList();
  }

  function getPartnerName() {
    if (props.partner != null) {
      return props.partner.name;
    } else {
      return "None";
    }
  }

  return (
    <div className="InfoBar">
      <div className="col-1">
        <button className="btn-userlist" onClick={showUserList}>Users</button>
        <p>In talk with <strong>{getPartnerName()}</strong></p>
      </div>
      <div className="col-2">
        <p>Logged in as <strong>{props.host.name}</strong></p>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default InfoBar;