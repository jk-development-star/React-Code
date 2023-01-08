import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Navbars from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import SideBar from "../SideBar";
import { addNewLead } from "../../actions/LeadActions";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

function Lead() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.totalUser);
  console.log(name);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  // const [messages, setMessages] = useState([]);
  const styles = {
    color: "red",
  };

  const LeadSchema = Yup.object().shape({
    owner_email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    owner_name: Yup.string().required("Owner Name is required"),
    owner_phone: Yup.number()
      .min(3, "Phone Number must have 10 digits")
      .required("Phone Number is required"),
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
      dispatch(addNewLead(values));
      navigate("/leads/list");
    },
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/user", {
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
  useEffect(() => {
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
          <Container className="mt-2">
            <div className="message" style={styles}>
              {/* {messages.map((v, index) =>
                    v ? <p key={index}>{v.message}</p> : null
                  )} */}
            </div>
            <div>
              <h2>Add New Lead</h2>
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
                  {formik.errors.owner_name && formik.touched.owner_name ? (
                    <div style={styles}>{formik.errors.owner_name}</div>
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
                  {formik.errors.owner_email && formik.touched.owner_email ? (
                    <div style={styles}>{formik.errors.owner_email}</div>
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
                  {formik.errors.owner_phone && formik.touched.owner_phone ? (
                    <div style={styles}>{formik.errors.owner_phone}</div>
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
                  {formik.errors.owner_address &&
                  formik.touched.owner_address ? (
                    <div style={styles}>{formik.errors.owner_address}</div>
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
                  {formik.errors.owner_city && formik.touched.owner_city ? (
                    <div style={styles}>{formik.errors.owner_city}</div>
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
                  {formik.errors.owner_state && formik.touched.owner_state ? (
                    <div style={styles}>{formik.errors.owner_state}</div>
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
                  {formik.errors.owner_country &&
                  formik.touched.owner_country ? (
                    <div style={styles}>{formik.errors.owner_country}</div>
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
                  {formik.errors.owner_zipcode &&
                  formik.touched.owner_zipcode ? (
                    <div style={styles}>{formik.errors.owner_zipcode}</div>
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
                  {formik.errors.covered_aread &&
                  formik.touched.covered_aread ? (
                    <div style={styles}>{formik.errors.covered_aread}</div>
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
                  {formik.errors.lead_budget && formik.touched.lead_budget ? (
                    <div style={styles}>{formik.errors.lead_budget}</div>
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
                  {formik.errors.lead_status && formik.touched.lead_status ? (
                    <div style={styles}>{formik.errors.lead_status}</div>
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
                  {formik.errors.assignee_id && formik.touched.assignee_id ? (
                    <div style={styles}>{formik.errors.assignee_id}</div>
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
                  {formik.errors.lead_remark_followup &&
                  formik.touched.lead_remark_followup ? (
                    <div style={styles}>
                      {formik.errors.lead_remark_followup}
                    </div>
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
                  {formik.errors.description && formik.touched.description ? (
                    <div style={styles}>{formik.errors.description}</div>
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
}

export default Lead;
