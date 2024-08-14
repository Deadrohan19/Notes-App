import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./features/login/userLoginSlice";
import userRegisterReducer from "./features/register/userRegisterSlice";
import notesListReducer from "./features/notes/notesListSlice";
import createNoteReducer from "./features/notes/createNoteSlice";
import getNoteReducer from "./features/notes/getNoteSlice";
import updateNoteReducer from "./features/notes/updateNoteSlice";
import deleteNoteReducer from "./features/notes/deleteNoteSlice";

const reducer = {
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  notesList: notesListReducer,
  createNote: createNoteReducer,
  updateNote: updateNoteReducer,
  getNote: getNoteReducer,
  deleteNote: deleteNoteReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
