import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Navbars from "./Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [leadCount, setLeadCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("user/", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        if (response.status === 200) {
          const usersCount = response.data.result.length;
          setUserCount(usersCount);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchLeadData = async () => {
      try {
        const response = await axios.get("lead/", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        if (response.status === 200) {
          const leadCount = response.data.result.length;
          setLeadCount(leadCount);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchLeadData();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-2">
            <SideBar />
          </div>

          <div className="col-lg-10 col-md-10 mt-2">
            <Navbars />
            <div className="row dashboard-card mt-3">
              <div className="column">
                <div className="card text-white bg-warning">
                  <div className="dashboard-report-block">
                    <div className="dIcons">
                      <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <div className="card-text">
                      <h3>{userCount}</h3>
                      <h3>Users</h3>
                      <Link to={"/list"} className="small-box-footer">
                        More info <i className="fas fa-arrow-circle-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="card text-white bg-success">
                  <div className="dashboard-report-block">
                    <div className="dIcons">
                      <FontAwesomeIcon icon={faBoxesStacked} />
                    </div>
                    <div className="card-text">
                      <h3>{leadCount}</h3>
                      <h3>Leads</h3>

                      <Link to={"/leads/list"} className="small-box-footer">
                        More info <i className="fas fa-arrow-circle-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="card text-white bg-primary">
                  <div className="dashboard-report-block">
                    <div className="dIcons">
                      <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <div className="card-text">
                      <h3>Users</h3>
                      <p>Some text</p>
                      <a href="#" className="small-box-footer">
                        More info <i className="fas fa-arrow-circle-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="card text-white bg-danger">
                  <div className="dashboard-report-block">
                    <div className="dIcons">
                      <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <div className="card-text">
                      <h3>Users</h3>
                      <p>Some text</p>
                      <a href="#" className="small-box-footer">
                        More info <i className="fas fa-arrow-circle-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
