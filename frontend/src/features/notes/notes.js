import axios from "axios";
import { notesFail, notesReq, notesSuccess } from "./notesListSlice";
import {
  createNoteFail,
  createNoteReq,
  createNoteSuccess,
} from "./createNoteSlice";

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch(notesReq());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("http://localhost:5000/api/notes", config);

    dispatch(notesSuccess(data));
  } catch (error) {
    const msg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(notesFail(msg));
  }
};

export const createNote =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch(createNoteReq());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      let payload = { title, content, category };
      if(category == ""){
       payload = {title, content};
      }
      const { data } = await axios.post(
        "http://localhost:5000/api/notes/create",
        payload,
        config
      );

      dispatch(createNoteSuccess(data));
    } catch (error) {
      const msg =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(createNoteFail(msg));
    }
  };

// TO DO : UPDATE AND DELETE

export default { listNotes, createNote };
