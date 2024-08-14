import {
  userRegisterFail,
  userRegisterSuccess,
  userRegisterPicFail,
  userRegisterReq,
} from "./userRegisterSlice";
import { userLoginSuccess } from "../login/userLoginSlice";
import axios from "axios";

const uploadImage = async (file, dispatch) => {
  if (!file) {
    dispatch(userRegisterPicFail("No file selected."));
    return "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
  }

  if (
    file.type == "image/jpeg" ||
    file.type == "image/png" ||
    file.type == "image/jpg"
  ) {
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
    // setPic(img.secure_url);
    console.log(img);
    return img.secure_url;
  } else {
    dispatch(userRegisterPicFail("Please select an image"));
    return 400;
  }
};

export const userRegister =
  (name, email, password, confirmPassword, file) => async (dispatch) => {
    // setError(false);
    if (password !== confirmPassword) {
      dispatch(userRegisterFail("Passwords do not match!"));
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        dispatch(userRegisterReq());

        const res = await uploadImage(file, dispatch);

        if (res !== 400) {
          const { data } = await axios.post(
            "http://localhost:5000/api/users",
            {
              name,
              email,
              password,
              pic: res,
            },
            config
          );

          console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          dispatch(userRegisterSuccess(data));
          dispatch(userLoginSuccess(data));
        } else {
          dispatch(userRegisterFail("Image upload Failed"));
        }
      } catch (error) {
        const msg =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(userRegisterFail(msg));
      }
    }
  };

export default userRegister;
