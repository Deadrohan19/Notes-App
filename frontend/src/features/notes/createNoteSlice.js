import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  notesInfo: {},
};

const createNoteSlice = createSlice({
  name: "createNote",
  initialState,
  reducers: {
    createNoteReq(state) {
      state.loading = true;
    },
    createNoteSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.notesInfo = action.payload;
    },
    createNoteFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createNoteFail, createNoteSuccess, createNoteReq } =
  createNoteSlice.actions;

export default createNoteSlice.reducer;
