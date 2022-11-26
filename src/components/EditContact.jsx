import React, { useState, useEffect } from "react";
import "react-bootstrap";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Navbars from "./Navbar";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import SideBar from "./SideBar";
function EditContact() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [message, setMessage] = useState("");
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const post = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone: data.phone,
    role: data.role,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        "http://localhost:8080/api/updateUser/" + params.id,
        post
      );
      if (res.status === 200) {
        setData();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const url = "http://localhost:8080/api/" + params.id;
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        if (response.status === 200) setData(response.data.result);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-2 col-md-2">
          <SideBar />
        </div>

        <div className="col-lg-10 col-md-10 mt-2">
          <Navbars />
          <Container className="mt-4">
            <div className="message">{message ? <p>{message}</p> : null}</div>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridUsername">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="first_name"
                    onChange={handleOnChange}
                    value={data.first_name}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridUsername">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="last_name"
                    onChange={handleOnChange}
                    value={data.last_name}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleOnChange}
                    value={data.email}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phonenumber"
                    name="phone"
                    onChange={handleOnChange}
                    value={data.phone}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPhoneNumber">
                  <Form.Label>User Role</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter role"
                    name="role"
                    onChange={handleOnChange}
                    value={data.role}
                  />
                </Form.Group>
              </Row>
              <div className="buttons">
                <Button variant="primary" type="submit">
                  Submit
                </Button>{" "}
                <Link to="/list">
                  <Button variant="danger" type="submit">
                    Back
                  </Button>
                </Link>
              </div>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
}

export default EditContact;
