import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  notes: [],
};

const notesListSlice = createSlice({
  name: "notesList",
  initialState,
  reducers: {
    notesReq(state) {
      state.loading = true;
    },
    notesSuccess(state, action) {
      state.loading = false;
      state.notes = action.payload;
    },
    notesFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { notesReq, notesSuccess, notesFail } = notesListSlice.actions;

export default notesListSlice.reducer;
