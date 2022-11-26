import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function SideBar() {
  const name = useSelector(
    (store) => `${store.user.first_name} ${store.user.last_name}`
  );
  const role = useSelector((store) => `${store.user.role}`);
  return (
    <>
      <div className="wrapper ">
        <div className="sidebar">
          <div className="profile">
            <img
              src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg"
              alt="profile_picture"
            />
            <h3>{name}</h3>
            <p>{role}</p>
          </div>
          <ul>
            <li>
              <NavLink activeclassname="active" to={"/dashboard"}>
                <span className="icon">
                  <i className="fas fa-desktop"></i>
                </span>
                <span className="item">My Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname="active" to={"/list"}>
                <span className="icon">
                  <i className="fas fa-user-friends"></i>
                </span>
                <span className="item">Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname="active" to={"/lead"}>
                <span className="icon">
                  <i className="fas fa-tachometer-alt"></i>
                </span>
                <span className="item">Leads</span>
              </NavLink>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <i className="fas fa-database"></i>
                </span>
                <span className="item">Development</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <i className="fas fa-chart-line"></i>
                </span>
                <span className="item">Reports</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <i className="fas fa-user-shield"></i>
                </span>
                <span className="item">Admin</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <i className="fas fa-cog"></i>
                </span>
                <span className="item">Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
