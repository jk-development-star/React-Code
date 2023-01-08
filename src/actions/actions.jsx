import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = "http://localhost:8080/api/v1/user";

const loginUser = (values) => async (dispatch) => {
  try {
    await axios
      .post(`${apiUrl}/login`, values)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "LOGINUSER",
            payload: res.data.result,
          });
          localStorage.setItem("token", "Bearer " + res.data.token);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.res.message);
      });
  } catch (err) {
    toast.error(err);
  }
};
const totalUser = async (dispatch) => {
  try {
    await axios
      .get("http://localhost:8080/api/v1/user", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "TOTALUSER",
            payload: res.data.result,
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.res.data.message);
      });
  } catch (err) {
    toast.error(err);
  }
};
const deleteUser = (id) => async (dispatch) => {
  try {
    await axios
      .delete(`http://localhost:8080/api/v1/user/delete/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "DELETEUSER",
            payload: { id },
          });
          toast.success(res.data.message);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.res.data.message);
      });
  } catch (err) {
    toast.error(err);
  }
};

const addNewUser = (values) => async (dispatch) => {
  try {
    await axios
      .post("http://localhost:8080/api/v1/user/addUser", values, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "ADDNEWUSER",
            payload: res.data.result,
          });
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
  } catch (err) {
    toast.error(err.res.data.message);
  }
};

export { loginUser, totalUser, deleteUser, addNewUser };
