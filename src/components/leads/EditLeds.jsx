import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Navbars from "../Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import SideBar from "../SideBar";
import * as Yup from "yup";

const EditLead = () => {
  const params = useParams();
  const name = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const styles = {
    color: "red",
  };

  const LeadSchema = Yup.object().shape({
    owner_email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    owner_name: Yup.string().required("Owner Name is required"),
    owner_phone: Yup.string()
      .min(3, "Phone Number must have 10 digits")
      .required("Owner Name is required"),
    owner_address: Yup.string().required("Owner Address is required"),
    owner_city: Yup.string().required("Owner City is required"),
    owner_state: Yup.string().required("Owner State is required"),
    owner_country: Yup.string().required("Owner Country is required"),
    owner_zipcode: Yup.string().required("Owner ZipCode is required"),
    lead_status: Yup.string().required("Lead Status is required"),
    covered_aread: Yup.string().required("Area is required"),
    assignee_id: Yup.string().required("Assignee is required"),
    lead_budget: Yup.string().required("Lead budget is required"),
    description: Yup.string().required("Description is required"),
    lead_remark_followup: Yup.string().required("Follow up is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
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
    },
    validationSchema: LeadSchema,
    onSubmit: async (values) => {
      try {
        let response = await axios.post(
          "http://localhost:8080/api/v1/lead/updateLead/" + params.id,
          values,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          navigate("/leads/list");
        }
      } catch (err) {
        const validation = err.response.data.errors;
        setMessages(Object.values(validation));
      }
    },
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/user/", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setUsers(response.data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLeadData = async () => {
    try {
      const url = "http://localhost:8080/api/v1/lead/" + params.id;
      const response = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        let data = response.data.result;
        formik.setValues(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchLeadData();
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
            <div className="message" style={styles}>
              {messages.map((v, index) =>
                v ? <p key={index}>{v.message}</p> : null
              )}
            </div>
            <div>
              <h2>Edit Lead</h2>
            </div>
            <Form onSubmit={formik.handleSubmit}>
              <span style={styles}>* Required Fields</span>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Lead Owner Name*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter owner name"
                    name="owner_name"
                    onChange={formik.handleChange}
                    value={formik.values.owner_name}
                  />
                  {formik.touched.owner_name && formik.errors.owner_name ? (
                    <span style={styles}>{formik.errors.owner_name}</span>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Lead Owner Email*</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter owner email"
                    name="owner_email"
                    onChange={formik.handleChange}
                    value={formik.values.owner_email}
                  />
                  {formik.touched.owner_email && formik.errors.owner_email ? (
                    <span style={styles}>{formik.errors.owner_email}</span>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>Lead Owner Phone Number*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter owner phone number"
                    name="owner_phone"
                    onChange={formik.handleChange}
                    value={formik.values.owner_phone}
                  />
                  {formik.touched.owner_phone && formik.errors.owner_phone ? (
                    <span style={styles}>{formik.errors.owner_phone}</span>
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
                    onChange={formik.handleChange}
                    value={formik.values.owner_address}
                  />
                  {formik.touched.owner_address &&
                  formik.errors.owner_address ? (
                    <span style={styles}>{formik.errors.owner_address}</span>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    name="owner_city"
                    onChange={formik.handleChange}
                    value={formik.values.owner_city}
                  />
                  {formik.touched.owner_city && formik.errors.owner_city ? (
                    <span style={styles}>{formik.errors.owner_city}</span>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter state"
                    name="owner_state"
                    onChange={formik.handleChange}
                    value={formik.values.owner_state}
                  />
                  {formik.touched.owner_state && formik.errors.owner_state ? (
                    <span style={styles}>{formik.errors.owner_state}</span>
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
                    onChange={formik.handleChange}
                    value={formik.values.owner_country}
                  />
                  {formik.touched.owner_country &&
                  formik.errors.owner_country ? (
                    <span style={styles}>{formik.errors.owner_country}</span>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZipCode">
                  <Form.Label>Zip Code*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Zip code"
                    name="owner_zipcode"
                    onChange={formik.handleChange}
                    value={formik.values.owner_zipcode}
                  />
                  {formik.touched.owner_zipcode &&
                  formik.errors.owner_zipcode ? (
                    <span style={styles}>{formik.errors.owner_zipcode}</span>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridArea">
                  <Form.Label>Covered Area*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter area"
                    name="covered_aread"
                    onChange={formik.handleChange}
                    value={formik.values.covered_aread}
                  />
                  {formik.touched.covered_aread &&
                  formik.errors.covered_aread ? (
                    <span style={styles}>{formik.errors.covered_aread}</span>
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
                    onChange={formik.handleChange}
                    value={formik.values.lead_budget}
                  />
                  {formik.touched.lead_budget && formik.errors.lead_budget ? (
                    <span style={styles}>{formik.errors.lead_budget}</span>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridStatus">
                  <Form.Label>Lead Status*</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="lead_status"
                    onChange={formik.handleChange}
                    value={formik.values.lead_status}
                  >
                    <option>Select Status</option>
                    <option value="0">In-Active</option>
                    <option value="1">Active</option>
                    <option value="2">Follow Up</option>
                  </Form.Select>
                  {formik.touched.lead_status && formik.errors.lead_status ? (
                    <span style={styles}>{formik.errors.lead_status}</span>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAssign">
                  <Form.Label>Lead Assign To*</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="assignee_id"
                    onChange={formik.handleChange}
                    value={formik.values.assignee_id}
                  >
                    <option>Select User</option>
                    {users.length !== 0 &&
                      users.map((user, index) => (
                        <option key={index} value={user.id}>
                          {user.first_name} {user.last_name}
                        </option>
                      ))}
                  </Form.Select>
                  {formik.touched.assignee_id && formik.errors.assignee_id ? (
                    <span style={styles}>{formik.errors.assignee_id}</span>
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
                    onChange={formik.handleChange}
                    value={formik.values.lead_remark_followup}
                  />
                  {formik.touched.lead_remark_followup &&
                  formik.errors.lead_remark_followup ? (
                    <span style={styles}>
                      {formik.errors.lead_remark_followup}
                    </span>
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
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <span style={styles}>{formik.errors.description}</span>
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
  );
};

export default EditLead;
