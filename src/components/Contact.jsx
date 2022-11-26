import React, { useState } from "react";
import { Formik } from "formik";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Navbars from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../Validations";
import axios from "axios";
import SideBar from "./SideBar";
function Contact() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const styles = {
    color: "red",
    fontSize: "14px",
  };
  return (
    <Formik
      validate={validate}
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        password_confirmation: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          let response = await axios.post("/api/addUser", values);
          if (response.status === 200) {
            navigate("/list");
            resetForm({});
          }
        } catch (err) {
          const validation = err.response.data.errors;
          setMessages(Object.values(validation));
        }
      }}
    >
      {({ errors, handleSubmit, handleChange, values }) => (
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 col-md-2">
              <SideBar />
            </div>
            <div className="col-lg-10 col-md-10 mt-2">
              <Navbars />
              <Container className="mt-4">
                <div className="message" style={styles}>
                  {messages.map((v, index) =>
                    v ? <p key={index}>{v.message}</p> : null
                  )}
                </div>
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="first_name"
                        onChange={handleChange}
                        value={values.first_name}
                      />
                      {errors.first_name ? (
                        <div style={styles}>{errors.first_name}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="last_name"
                        onChange={handleChange}
                        value={values.last_name}
                      />
                      {errors.last_name ? (
                        <div style={styles}>{errors.last_name}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                      />
                      {errors.email ? (
                        <div style={styles}>{errors.email}</div>
                      ) : null}
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPhoneNumber">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter phonenumber"
                        name="phone"
                        onChange={handleChange}
                        value={values.phone}
                      />
                      {errors.phone ? (
                        <div style={styles}>{errors.phone}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridUserRole">
                      <Form.Label>User Role</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter user role"
                        name="role"
                        onChange={handleChange}
                        value={values.role}
                      />
                      {errors.role ? (
                        <div style={styles}>{errors.role}</div>
                      ) : null}
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                      />
                      {errors.password ? (
                        <div style={styles}>{errors.password}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridConfirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name="password_confirmation"
                        onChange={handleChange}
                        value={values.password_confirmation}
                      />
                      {errors.password_confirmation ? (
                        <div style={styles}>{errors.password_confirmation}</div>
                      ) : null}
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
        </div>
      )}
    </Formik>
  );
}

export default Contact;
