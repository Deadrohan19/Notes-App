import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
  success: false,
  notesInfo: {},
};

const updateNoteSlice = createSlice({
  name: "updateNote",
  initialState,
  reducers: {
    updateNoteReq(state) {
      state.loading = true;
    },
    updateNoteSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.notesInfo = action.payload;
    },
    updateNoteFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateNoteReset(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.notesInfo = {};
    },
  },
});

export const {
  updateNoteFail,
  updateNoteReq,
  updateNoteSuccess,
  updateNoteReset,
} = updateNoteSlice.actions;

export default updateNoteSlice.reducer;
