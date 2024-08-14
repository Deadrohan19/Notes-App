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
    listNotesReq(state) {
      state.loading = true;
    },
    listNotesSuccess(state, action) {
      state.loading = false;
      state.notes = action.payload;
    },
    listNotesFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { listNotesReq, listNotesSuccess, listNotesFail } =
  notesListSlice.actions;

export default notesListSlice.reducer;
