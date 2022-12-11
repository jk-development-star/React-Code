import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ResetPasswordValidate } from "../Validations";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";

function ResetPassword() {
  const params = useParams();
  const navigate = useNavigate();
  const styles = {
    color: "red",
    fontSize: "14px",
  };
  return (
    <Formik
      validate={ResetPasswordValidate}
      initialValues={{
        password: "",
        confirm_password: "",
      }}
      onSubmit={async (values) => {
        try {
          let response = await axios.post(
            "user/reset-password/" + params.id + "/" + params.token,
            values
          );
          if (response.status === 200) {
            toast.success(response.data.message);
            const timer = setTimeout(() => {
              navigate("/");
            }, 5000);
            return () => clearTimeout(timer);
          } else {
            toast.error(response.data.message);
            const timer = setTimeout(() => {
              navigate("/");
            }, 5000);
            return () => clearTimeout(timer);
          }
        } catch (err) {
          if (
            err.response.status === 400 ||
            err.response.status === 402 ||
            err.response.status === 300
          ) {
            const errorMessage = err.response.data.message;
            toast.error(errorMessage);
          }
        }
      }}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <>
          <div className="outer login-class">
            <div className="inner">
              <h3>Reset Password</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Enter password"
                  />
                  {errors.password ? (
                    <div style={styles}>{errors.password}</div>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="confirm_password"
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Enter confirm password"
                  />
                  {errors.confirm_password ? (
                    <div style={styles}>{errors.confirm_password}</div>
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
                <p className="forgot-password text-right">
                  <Link to={"/"}>Back to login page?</Link>
                </p>
              </Form>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
}

export default ResetPassword;
