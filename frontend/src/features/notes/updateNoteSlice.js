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
  },
});

export const {updateNoteFail, updateNoteReq, updateNoteSuccess} = updateNoteSlice.actions;

export default updateNoteSlice.reducer;
