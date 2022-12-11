import React, { useEffect, useState } from "react";
import "react-bootstrap";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Navbars from "./Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import SideBar from "./SideBar";
function ShowContact() {
  const params = useParams();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
  });
  useEffect(() => {
    const url = "user/" + params.id;
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 col-md-2">
          <SideBar />
        </div>

        <div className="col-lg-10 col-md-10 mt-2">
          <Navbars />
          <Container className="mt-4">
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridUsername">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control value={data.first_name} readOnly />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridUsername">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control value={data.last_name} readOnly />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control value={data.email} readOnly />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control value={data.phone} readOnly />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridUserRole">
                  <Form.Label>User Role</Form.Label>
                  <Form.Control value={data.role} readOnly />
                </Form.Group>
              </Row>
              <div className="buttons">
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
    </div>
  );
}

export default ShowContact;
