import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  picError: null,
  userInfo: "",
};

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
    userRegisterReq(state) {
      state.loading = true;
      state.error = null;
      state.picError = null;
    },
    userRegisterSuccess(state, action) {
      state.loading = false;
      state.error=null;
      state.picError = null;
      state.userInfo = action.payload;
    },
    userRegisterFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userRegisterPicFail(state, action) {
      state.loading = false;
      state.picError = action.payload;
    },
  },
});

export const {userRegisterFail, userRegisterPicFail, userRegisterSuccess, userRegisterReq} = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
