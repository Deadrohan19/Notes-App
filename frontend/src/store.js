import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./features/user/userLoginSlice";
import userRegisterReducer from "./features/user/userRegisterSlice";
import userUpdateReducer from "./features/user/userUpdateSlice";
import notesListReducer from "./features/notes/notesListSlice";
import createNoteReducer from "./features/notes/createNoteSlice";
import getNoteReducer from "./features/notes/getNoteSlice";
import updateNoteReducer from "./features/notes/updateNoteSlice";
import deleteNoteReducer from "./features/notes/deleteNoteSlice";

const reducer = {
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
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
