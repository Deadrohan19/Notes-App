import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  userInfo: "",
};
const tmp = localStorage.getItem("userInfo");
initialState.userInfo = tmp !== null ? JSON.parse(tmp) : "";

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    userLoginReq(state) {
      state.loading = true;
    },
    userLoginSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userLoginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout(state) {
      state.loading = false;
      state.error = null;
      state.userInfo = "";
    },
  },
});

export const { userLoginReq, userLoginFail, userLoginSuccess, userLogout } =
  userLoginSlice.actions;

export default userLoginSlice.reducer;
