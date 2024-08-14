import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const deleteNoteSlice = createSlice({
  name: "deleteNote",
  initialState,
  reducers: {
    deleteNoteReq(state) {
      state.loading = true;
    },
    deleteNoteSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    deleteNoteFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { deleteNoteFail, deleteNoteReq, deleteNoteSuccess } =
  deleteNoteSlice.actions;

export default deleteNoteSlice.reducer;
