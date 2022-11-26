import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { loginValidate } from "../Validations";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { loginUser } from "../actions/actions";
import { useDispatch } from "react-redux";
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const styles = {
    color: "red",
    fontSize: "14px",
  };
  return (
    <Formik
      validate={loginValidate}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        dispatch(loginUser(values));
        navigate("/dashboard");
      }}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <>
          <div className="outer login-class">
            <div className="inner">
              <h3>Log in</h3>
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

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Password"
                  />
                  {errors.password ? (
                    <div style={styles}>{errors.password}</div>
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
                  <Link to={"/forgot/password"}>Forgot password?</Link>
                </p>
              </Form>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;
