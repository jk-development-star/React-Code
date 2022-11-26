import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Navbars from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import SideBar from "./SideBar";
import { ToastContainer, toast } from "react-toastify";
function List() {
  let i = 1;
  const [users, setUsers] = useState([]);
  const mystyle = {
    width: "20%",
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/api", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setUsers(response.data.result);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/api/delete/${id}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            toast.success("User deleted successfully.");
            fetchData();
          });
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <ToastContainer />
        <div className="row">
          <div className="col-lg-2 col-md-2">
            <SideBar />
          </div>
          <div className="col-lg-10 col-md-10 mt-2">
            <Navbars />
            <div className="list mt-4">
              <div className="add-button">
                <Link to="/contact">
                  <Button
                    className=" btn btn-success mb-2"
                    variant="success"
                    active
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add New User
                  </Button>
                </Link>
              </div>
              <table id="example" className="table table-striped responsive">
                <thead>
                  <tr>
                    <th style={{ mystyle }}>SrNo.</th>
                    <th style={{ mystyle }}>Name</th>
                    <th style={{ mystyle }}>Email</th>
                    <th style={{ mystyle }}>Phone Number</th>
                    <th style={{ mystyle }}>User Role</th>
                    <th style={{ mystyle }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length !== 0 ? (
                    users.map((user, index) => (
                      <tr key={index}>
                        <td>{i++}</td>
                        <td>
                          {user.first_name} {user.last_name}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.role}</td>
                        <td className="buttons d-flex justify-content-center">
                          <Link to={`/show/${user.id}`}>
                            <button
                              className="btn btn-primary col-3"
                              title="View"
                              active="true"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </button>
                          </Link>
                          <Link to={`/edit/${user.id}`}>
                            <button
                              className="btn btn-success"
                              title="Edit"
                              active="true"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                          </Link>
                          <button
                            onClick={(e) => deleteUser(e, user.id)}
                            className="btn btn-danger"
                            active="true"
                            title="Delete"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        No data found
                      </td>
                      <td style={{ display: "none" }}></td>
                      <td style={{ display: "none" }}></td>
                      <td style={{ display: "none" }}></td>
                      <td style={{ display: "none" }}></td>
                      <td style={{ display: "none" }}></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default List;
