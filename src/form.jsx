import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Button, Container, Row } from "react-bootstrap";
import axios from "axios";
import { LeadValidate } from "./Validations";
import { useParams } from "react-router-dom";
function Basic() {
  const params = useParams();
  const [lead, setLead] = useState([]);

  const url = "http://localhost:8080/api/v1/lead/" + params.id;
  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) setLead(response.data.result);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  <div>
    <h1>Sign Up</h1>
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
          let response = await axios.post(
            "http://localhost:8080/api/v1/lead/new",
            values,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          if (response.status === 200) {
            resetForm({});
          }
        } catch (err) {
          const validation = err.response.data.errors;
          //   setMessages(Object.values(validation));
        }
      }}
    >
      {({ errors }) => (
        <Container>
          <Form>
            <Row className="mb-3">
              <label htmlFor="firstName">owner_name</label>
              <Field
                className="form-control"
                type="text"
                placeholder="Enter owner name"
                name="owner_name"
                value={lead.owner_name}
              />
              {errors.owner_name ? <div>{errors.owner_name}</div> : null}
              <label htmlFor="email">Email</label>
              <Field
                className="form-control"
                type="text"
                placeholder="Enter owner phone number"
                name="owner_email"
              />
              {errors.owner_email ? <div>{errors.owner_email}</div> : null}
              <label htmlFor="email">owner_phone</label>
              <Field
                className="form-control"
                type="text"
                placeholder="Enter owner phone number"
                name="owner_phone"
              />
              {errors.owner_phone ? <div>{errors.owner_phone}</div> : null}
              <label htmlFor="email">owner_address</label>
              <Field
                className="form-control"
                type="text"
                placeholder="Enter address"
                name="owner_address"
              />
              {errors.owner_address ? <div>{errors.owner_address}</div> : null}
              <label htmlFor="email">owner_city</label>
              <Field
                className="form-control"
                type="text"
                placeholder="Enter city"
                name="owner_city"
              />
              {errors.owner_city ? <div>{errors.owner_city}</div> : null}
              <label htmlFor="email">owner_state</label>
              <Field
                className="form-control"
                type="text"
                placeholder="Enter state"
                name="owner_state"
              />
              {errors.owner_state ? <div>{errors.owner_state}</div> : null}
              <label htmlFor="email">owner_country</label>
              <Field
                className="form-control"
                type="text"
                placeholder="Enter country"
                name="owner_country"
              />
              <label htmlFor="email">owner_zipcode</label>
              <Field
                className="form-control"
                type="text"
                placeholder="Enter Zip code"
                name="owner_zipcode"
              />
              <label htmlFor="email">covered_aread</label>
              <Field
                className="form-control"
                type="text"
                placeholder="Enter area"
                name="covered_aread"
              />
              <label htmlFor="email">lead_budget</label>
              <Field
                className="form-control"
                type="text"
                placeholder="Enter budget"
                name="lead_budget"
              />
              <label htmlFor="email">lead_status</label>
              <Field
                className="form-control"
                type="text"
                placeholder="lead status"
                name="lead_status"
              />
              <label htmlFor="email">assignee_id</label>
              <Field
                className="form-control"
                type="text"
                placeholder="assignee id"
                name="assignee_id"
              />
              <label htmlFor="email">lead_remark_followup</label>
              <Field
                className="form-control"
                as="textarea"
                type="text"
                placeholder="Lead followup status"
                name="lead_remark_followup"
              />
              <label htmlFor="email">description</label>
              <Field
                className="form-control"
                as="textarea"
                type="text"
                placeholder="Lead description"
                name="description"
              />
              <label htmlFor="email">description</label>
              <Field
                className="form-control"
                type="hidden"
                name="generated_by"
                defaultValue="1"
              />
            </Row>
            <Button type="submit" className="btn btn-success mt-5">
              Submit
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  </div>;
}

export default Basic;
