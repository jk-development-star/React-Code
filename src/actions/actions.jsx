import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const apiUrl = "http://localhost:8080/api/v1/user";

const loginUser = (values) => async (dispatch) => {
  await axios
    .post(`${apiUrl}/login`, values)
    .then((res) => {
      dispatch({
        type: "LOGINUSER",
        payload: res.data.result,
      });
      localStorage.setItem("token", "Bearer " + res.data.token);
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export { loginUser };
