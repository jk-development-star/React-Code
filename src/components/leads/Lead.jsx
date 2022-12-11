import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Navbars from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { LeadValidate } from "../../Validations";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import SideBar from "../SideBar";
function Lead() {
  const name = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const styles = {
    color: "red",
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("user/getUsers", {
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
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Formik
      validate={LeadValidate}
      initialValues={{
        owner_name: "",
        owner_email: "",
        owner_phone: "",
        owner_address: "",
        owner_city: "",
        owner_state: "",
        owner_zipcode: "",
        owner_country: "",
        lead_budget: "",
        covered_aread: "",
        assignee_id: "",
        description: "",
        lead_status: "",
        lead_remark_followup: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          let response = await axios.post("lead/new", values, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          if (response.status === 200) {
            resetForm({});
          }
        } catch (err) {
          const validation = err.response.data.errors;
          setMessages(Object.values(validation));
        }
      }}
    >
      {({ errors, handleSubmit, handleChange, values, touched }) => (
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 col-md-2">
              <SideBar />
            </div>
            <div className="col-lg-10 col-md-10 mt-2">
              <Navbars />
              <Container className="mt-2">
                <div className="message" style={styles}>
                  {messages.map((v, index) =>
                    v ? <p key={index}>{v.message}</p> : null
                  )}
                </div>
                <div>
                  <h2>Add New Lead</h2>
                </div>
                <Form onSubmit={handleSubmit}>
                  <span style={styles}>* Required Fields</span>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                      <Form.Label>Lead Owner Name*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter owner name"
                        name="owner_name"
                        onChange={handleChange}
                        value={values.owner_name}
                      />
                      {errors.owner_name && touched.owner_name ? (
                        <div style={styles}>{errors.owner_name}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Lead Owner Email*</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter owner email"
                        name="owner_email"
                        onChange={handleChange}
                        value={values.owner_email}
                      />
                      {errors.owner_email ? (
                        <div style={styles}>{errors.owner_email}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPhone">
                      <Form.Label>Lead Owner Phone Number*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter owner phone number"
                        name="owner_phone"
                        onChange={handleChange}
                        value={values.owner_phone}
                      />
                      {errors.owner_phone ? (
                        <div style={styles}>{errors.owner_phone}</div>
                      ) : null}
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridAddress">
                      <Form.Label>Lead Owner Address*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter address"
                        name="owner_address"
                        onChange={handleChange}
                        value={values.owner_address}
                      />
                      {errors.owner_address ? (
                        <div style={styles}>{errors.owner_address}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>City*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter city"
                        name="owner_city"
                        onChange={handleChange}
                        value={values.owner_city}
                      />
                      {errors.owner_city ? (
                        <div style={styles}>{errors.owner_city}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>State*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter state"
                        name="owner_state"
                        onChange={handleChange}
                        value={values.owner_state}
                      />
                      {errors.owner_state ? (
                        <div style={styles}>{errors.owner_state}</div>
                      ) : null}
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCountry">
                      <Form.Label>Country*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter country"
                        name="owner_country"
                        onChange={handleChange}
                        value={values.owner_country}
                      />
                      {errors.owner_country ? (
                        <div style={styles}>{errors.owner_country}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZipCode">
                      <Form.Label>Zip Code*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Zip code"
                        name="owner_zipcode"
                        onChange={handleChange}
                        value={values.owner_zipcode}
                      />
                      {errors.owner_zipcode ? (
                        <div style={styles}>{errors.owner_zipcode}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridArea">
                      <Form.Label>Covered Area*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter area"
                        name="covered_aread"
                        onChange={handleChange}
                        value={values.covered_aread}
                      />
                      {errors.covered_aread ? (
                        <div style={styles}>{errors.covered_aread}</div>
                      ) : null}
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridBudget">
                      <Form.Label>Lead Budget*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter budget"
                        name="lead_budget"
                        onChange={handleChange}
                        value={values.lead_budget}
                      />
                      {errors.lead_budget ? (
                        <div style={styles}>{errors.lead_budget}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridStatus">
                      <Form.Label>Lead Status*</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="lead_status"
                        onChange={handleChange}
                        value={values.lead_status}
                      >
                        <option>Select Status</option>
                        <option value="0">In-Active</option>
                        <option value="1">Active</option>
                        <option value="2">Follow Up</option>
                      </Form.Select>
                      {errors.lead_status ? (
                        <div style={styles}>{errors.lead_status}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridAssign">
                      <Form.Label>Lead Assign To*</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="assignee_id"
                        onChange={handleChange}
                        value={values.assignee_id}
                      >
                        <option>Select User</option>
                        {users.length != 0 &&
                          users.map((user, index) => (
                            <option key={index} value={user.id}>
                              {user.first_name} {user.last_name}
                            </option>
                          ))}
                      </Form.Select>
                      {errors.assignee_id ? (
                        <div style={styles}>{errors.assignee_id}</div>
                      ) : null}
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFollowup">
                      <Form.Label>Lead Follow Up(Detailed status)*</Form.Label>
                      <Form.Control
                        as="textarea"
                        type="text"
                        placeholder="Lead followup status"
                        name="lead_remark_followup"
                        onChange={handleChange}
                        value={values.lead_remark_followup}
                      />
                      {errors.lead_remark_followup ? (
                        <div style={styles}>{errors.lead_remark_followup}</div>
                      ) : null}
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDescription">
                      <Form.Label>Lead Description*</Form.Label>
                      <Form.Control
                        as="textarea"
                        type="text"
                        placeholder="Lead description"
                        name="description"
                        onChange={handleChange}
                        value={values.description}
                      />
                      {errors.description ? (
                        <div style={styles}>{errors.description}</div>
                      ) : null}
                    </Form.Group>
                  </Row>
                  <Form.Group as={Col} controlId="formGridGeneratedby">
                    <Form.Control
                      type="hidden"
                      name="generated_by"
                      defaultValue={name.id}
                    />
                  </Form.Group>
                  <div className="buttons">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>{" "}
                    <Link to="/leads/list">
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

export default Lead;
