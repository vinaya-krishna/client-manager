import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Link to="/client/add" className="btn btn-primary btn-block">
      <i className="fas fa-plus">New</i>
    </Link>
  );
}

export default Sidebar;
