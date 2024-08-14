import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
  success: false,
  notesInfo: {},
};

const getNoteSlice = createSlice({
  name: "getNote",
  initialState,
  reducers: {
    getNoteReq(state) {
      state.loading = true;
    },
    getNoteSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.notesInfo = action.payload;
    },
    getNoteFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getNoteFail, getNoteReq, getNoteSuccess } = getNoteSlice.actions;

export default getNoteSlice.reducer;
