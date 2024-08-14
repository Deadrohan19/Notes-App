import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./features/login/userLoginSlice";
import userRegisterReducer from "./features/register/userRegisterSlice";
import notesListReducer from "./features/notes/notesListSlice";
import createNoteReducer from "./features/notes/createNoteSlice";

const reducer = {
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  notesList: notesListReducer,
  createNote: createNoteReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
