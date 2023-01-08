import axios from "axios";
import { toast } from "react-toastify";

const totalLead = async (dispatch) => {
  try {
    const url = "http://localhost:8080/api/v1/lead";
    await axios
      .get(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "TOTALLEAD",
            payload: res.data.result,
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  } catch (error) {
    toast.error(error);
  }
};

const addNewLead = (values) => async (dispatch) => {
  try {
    await axios
      .post("http://localhost:8080/api/v1/lead/new", values, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "ADDLEAD",
            payload: res.data.result,
          });
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.res.errors);
      });
  } catch (err) {
    toast.error(err.res.data.errors);
  }
};

const findLead = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "FINDLEAD",
      payload: id,
    });
  } catch (err) {
    toast.error(err);
  }
};

const updateLead = (values) => async (dispatch) => {
  try {
    await axios
      .post(
        `http://localhost:8080/api/v1/lead/updateLead/${values.id}`,
        values,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "UPDATELEAD",
            payload: res.data.result,
          });
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.res.data.errors);
      });
  } catch (err) {
    toast.error(err.res.data.errors);
  }
};

export { totalLead, addNewLead, findLead, updateLead };
