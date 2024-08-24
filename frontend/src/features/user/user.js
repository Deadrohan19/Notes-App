import {
  userRegisterFail,
  userRegisterSuccess,
  userRegisterPicFail,
  userRegisterReq,
} from "./userRegisterSlice";

import {
  userLoginFail,
  userLoginReq,
  userLoginSuccess,
} from "./userLoginSlice";

import {
  userUpdateFail,
  userUpdatePicFail,
  userUpdateReq,
  userUpdateSuccess,
} from "./userUpdateSlice";

import axios from "axios";
const url = import.meta.env.VITE_URL;

const uploadImage = async (file) => {
  if (
    file.type == "image/jpeg" ||
    file.type == "image/png" ||
    file.type == "image/jpg"
  ) {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "dgcxqbcgs");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dgcxqbcgs/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const img = await res.json();
      console.log(img);
      return { status: 200, url: img.secure_url };
    } catch (error) {
      const msg =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(msg);

      return { status: 400, message: msg };
    }
  } else {
    return { status: 403, message: "Please select an image" };
  }
};

export const userRegister = (user, file) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    dispatch(userRegisterReq());
    let res = { status: 200 };

    if (file) {
      res = await uploadImage(file);
    }

    if (res.status == 200) {
      user.pic = res.url;
      const { data } = await axios.post(`${url}/api/users`, user, config);

      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(userRegisterSuccess(data));
      dispatch(userLoginSuccess(data));
    } else {
      dispatch(userRegisterPicFail(res.message));
      dispatch(userRegisterFail("Try again!"));
    }
  } catch (error) {
    const msg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userRegisterFail(msg));
  }
};

export const userLogin = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userLoginReq());

    const { data } = await axios.post(
      `${url}/api/users/login`,
      {
        email,
        password,
      },
      config
    );
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

export const userUpdate = (user, file) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateReq());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let res = { status: 200 };
    if (file) {
      res = await uploadImage(file);
    }

    if (res.status === 200) {
      user.pic = res.url;
      const { data } = await axios.post(
        `${url}/api/users/profile`,
        user,
        config
      );

      dispatch(userUpdateSuccess(data));
      dispatch(userLoginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      dispatch(userUpdatePicFail(res.message));
      dispatch(userUpdateFail("Try again!"));
    }
  } catch (error) {
    const msg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userUpdateFail(msg));
  }
};

export default { userRegister, userLogin, userUpdate };
