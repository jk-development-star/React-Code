import { ToastContainer, toast } from "react-toastify";

const validate = (values) => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = "First Name is Required";
    toast.error(errors.first_name);
    <ToastContainer />;
  } else if (values.first_name.length > 15) {
    errors.first_name = "Must be 15 characters or less";
  }
  if (!values.last_name) {
    errors.last_name = "Last Name is Required";
  } else if (values.last_name.length > 20) {
    errors.last_name = "Must be 20 characters or less";
  }
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email should be like 'abc@test.com'";
  }
  if (!values.role) {
    errors.role = "Role is Required";
  }
  if (!values.phone) {
    errors.phone = "Phone number is Required";
  } else if (values.phone.length !== 10) {
    errors.phone = "Phone number length should be 10 digits";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 8) {
    errors.password = "*Password must be 8 characters long.";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/i.test(
      values.password
    )
  ) {
    errors.password =
      "Password must be the combination, of uppercase character, special character, number, and lower case character.";
  }
  if (!values.password_confirmation) {
    errors.password_confirmation = " Confirm Password is required.";
  } else if (values.password_confirmation !== values.password) {
    errors.password_confirmation =
      " Password and Confirm Password should be same.";
  }

  return errors;
};

const loginValidate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email should be like 'abc@test.com'";
  }

  if (!values.password) {
    errors.password = "Password is Required";
  }

  return errors;
};

const forgotValidate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email should be like 'abc@test.com'";
  }

  return errors;
};

const ResetPasswordValidate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be 8 characters long.";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/i.test(
      values.password
    )
  ) {
    errors.password =
      "Password must be the combination, of uppercase character, special character, number, and lower case character.";
  }
  if (!values.confirm_password) {
    errors.confirm_password = " Confirm Password is required.";
  } else if (values.confirm_password !== values.password) {
    errors.confirm_password = " Password and Confirm Password should be same.";
  }
  return errors;
};

export { validate, loginValidate, forgotValidate, ResetPasswordValidate };
