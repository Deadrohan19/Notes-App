import axios from "axios";
import {
  listNotesFail,
  listNotesReq,
  listNotesSuccess,
} from "./notesListSlice";
import {
  createNoteFail,
  createNoteReq,
  createNoteSuccess,
} from "./createNoteSlice";
import {
  updateNoteFail,
  updateNoteReq,
  updateNoteSuccess,
} from "./updateNoteSlice";
import { getNoteFail, getNoteReq, getNoteSuccess } from "./getNoteSlice";
import {
  deleteNoteFail,
  deleteNoteReq,
  deleteNoteSuccess,
} from "./deleteNoteSlice";

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch(listNotesReq());

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

    dispatch(listNotesSuccess(data));
  } catch (error) {
    const msg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(listNotesFail(msg));
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
      if (category == "") {
        payload = { title, content };
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

export const getSingleNote = (id) => async (dispatch, getState) => {
  try {
    dispatch(getNoteReq());
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/notes/${id}`,
      config
    );
    dispatch(getNoteSuccess(data));
  } catch (error) {
    const msg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(getNoteFail(msg));
  }
};

export const updateNote =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch(updateNoteReq());

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
      if (category == "") {
        payload = { title, content };
      }

      const { data } = await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        payload,
        config
      );

      dispatch(updateNoteSuccess(data));
    } catch (error) {
      const msg =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(updateNoteFail(msg));
    }
  };

export const deleteNote = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteNoteReq());
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`http://localhost:5000/api/notes/${id}`, config);
    dispatch(deleteNoteSuccess());
  } catch (error) {
    const msg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(deleteNoteFail(msg));
  }
};

export default { listNotes, createNote, getSingleNote, updateNote, deleteNote };
