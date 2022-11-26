import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const apiUrl = "http://localhost:8080/api";

const loginUser = (values) => async (dispatch) => {
  await axios
    .post(`${apiUrl}/login`, values)
    .then((res) => {
      localStorage.setItem("token", "Bearer " + res.data.token);
      dispatch({
        type: "LOGINUSER",
        payload: res.data.result,
      });
    })
    .catch((err) => {
      console.log(err);
      // toast.error(err.response.data.message);
    });
};

export { loginUser };
