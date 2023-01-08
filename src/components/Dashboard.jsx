import React, { useEffect } from "react";
import SideBar from "./SideBar";
import Navbars from "./Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { totalLead } from "../actions/LeadActions";
import { totalUser } from "../actions/actions";
import { ToastContainer } from "react-toastify";
function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(totalLead);
    dispatch(totalUser);
  }, []);
  const leads = useSelector((state) => state.lead);
  const users = useSelector((state) => state.user.totalUser);
  const user = users ? users.length : 0;
  const lead = leads.lead ? leads.lead.length : 0;

  return (
    <>
      <ToastContainer />
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
                      <h3>{user}</h3>
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
                      <h3>{lead}</h3>
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
                      <Link to={"/list"} className="small-box-footer">
                        More info <i className="fas fa-arrow-circle-right"></i>
                      </Link>
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
                      <Link to={"/list"} className="small-box-footer">
                        More info <i className="fas fa-arrow-circle-right"></i>
                      </Link>
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
