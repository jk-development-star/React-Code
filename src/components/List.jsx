import React from "react";
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
import SideBar from "./SideBar";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../actions/actions";
import { ToastContainer } from "react-toastify";

function List() {
  const dispatch = useDispatch();
  let i = 1;
  const users = useSelector((state) => state.user.totalUser);
  const mystyle = {
    width: "20%",
  };

  const deleteUsers = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUser(id));
        // axios
        //   .delete(`http://localhost:8080/api/v1/user/delete/${id}`, {
        //     headers: {
        //       Authorization: localStorage.getItem("token"),
        //     },
        //   })
        //   .then((res) => {
        //     toast.success("User deleted successfully.");
        //   });
      }
    });
  };

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
                            onClick={(e) => deleteUsers(e, user.id)}
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
