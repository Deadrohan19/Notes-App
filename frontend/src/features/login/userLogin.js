import {
  userLoginFail,
  userLoginReq,
  userLoginSuccess,
} from "./userLoginSlice";
import axios from "axios";

export const userLogin = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    dispatch(userLoginReq());

    const { data } = await axios.post(
      "http://localhost:5000/api/users/login",
      {
        email,
        password,
      },
      config
    );
    console.log(data);
    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch(userLoginSuccess(data));
  } catch (error) {
    const msg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLoginFail(msg));
  }
};

export default userLogin;
