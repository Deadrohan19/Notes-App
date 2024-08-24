import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
  picError: null,
  userInfo: "",
};

const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState,
  reducers: {
    userUpdateReq(state) {
      state.loading = true;
      state.error = null;
      state.picError = null;
    },
    userUpdateSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.picError = null;
      state.userInfo = action.payload;
      state.success = true;
    },
    userUpdateFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userUpdatePicFail(state, action) {
      state.loading = false;
      state.picError = action.payload;
    },
  },
});

export const {
  userUpdateFail,
  userUpdatePicFail,
  userUpdateReq,
  userUpdateSuccess,
} = userUpdateSlice.actions;

export default userUpdateSlice.reducer;
