import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { forgotValidate } from "../Validations";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";

function ForgotPasswordEmail() {
  const navigate = useNavigate();
  const styles = {
    color: "red",
    fontSize: "14px",
  };
  return (
    <Formik
      validate={forgotValidate}
      initialValues={{
        email: "",
      }}
      onSubmit={async (values) => {
        try {
          let response = await axios.post("/api/forgotPasswordEmail", values);
          if (response.status === 200) {
            toast.success(response.data.message);
          }
        } catch (err) {
          if (err.response.status === 400 || err.response.status === 402) {
            const validation = err.response.data.message;
            toast.error(validation);
          }
        }
      }}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <>
          <div className="outer login-class">
            <div className="inner">
              <h3>Forgot Password</h3>
              <p>
                Enter your registered Email address to get the reset password
                link.
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Enter email"
                  />
                  {errors.email ? (
                    <div style={styles}>{errors.email}</div>
                  ) : null}
                </Form.Group>

                <Button
                  variant="btn btn-dark btn-lg btn-block"
                  className="mt-3"
                  type="submit"
                >
                  Submit
                </Button>
                <ToastContainer />
              </Form>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
}

export default ForgotPasswordEmail;
