import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faBars } from "@fortawesome/free-solid-svg-icons";
import storage from "redux-persist/lib/storage";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useNavigate } from "react-router-dom";
function Navbars() {
  const navigate = useNavigate();
  const logout = <FontAwesomeIcon icon={faRightFromBracket} />;
  let logoutUSer = () => {
    storage.removeItem("persist:rootData");
    localStorage.clear();
    navigate("/");
  };
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="index3.html" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link">
            Contact
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <div className="profile-nav">
            <img
              src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg"
              alt="profile_picture"
            />
          </div>
        </li>
        <li className="nav-item">
          <div className="user-actions">
            <a href="" onClick={logoutUSer} title="Logout">
              {logout}
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbars;
