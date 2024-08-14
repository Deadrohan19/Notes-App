import MainScreen from "../MainScreen";
import {
  useAccordionButton,
  Accordion,
  Badge,
  Button,
  Card,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, listNotes } from "../../features/notes/notes";
import Loading from "../../Components/Loader/Loading";
import ErrorMessage from "../../Components/ErrorMessage";
import Markdown from "react-markdown";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {});

  return (
    <span
      style={{
        color: "black",
        textDecoration: "none",
        flex: 1,
        cursor: "pointer",
        alignSelf: "center",
        fontSize: 18,
      }}
      onClick={decoratedOnClick}
    >
      {children}
    </span>
  );
}

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notesList = useSelector((state) => state.notesList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: createSuccess } = useSelector((state) => state.createNote);
  const { success: updateSuccess } = useSelector((state) => state.updateNote);
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
  } = useSelector((state) => state.deleteNote);
  const { loading, notes, error } = notesList;
  const [reverseNotes, setReverseNotes] = useState([]);

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    createSuccess,
    updateSuccess,
    deleteSuccess,
  ]);

  useEffect(() => {
    setReverseNotes(
      [...notes]
        .reverse()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
    );
  }, [notes, search]);

  const deleteHandler = (id) => {
    if (window.confirm("are you sure?")) {
      dispatch(deleteNote(id));
      navigate("/mynotes");
    }
  };

  const dateConvert = (timestamp) => {
    const tmpDate = new Date(timestamp);
    const localDate = tmpDate.toLocaleString();
    return localDate;
  };

  return (
    <MainScreen title="My Notes">
      <Link to="/createnote">
        <Button size="lg" style={{ marginLeft: 10, marginBottom: 6 }}>
          Create New Note
        </Button>
      </Link>
      {(loading || deleteLoading) && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {deleteError && (
        <ErrorMessage variant="danger">{deleteError}</ErrorMessage>
      )}
      <Accordion>
        {reverseNotes.map((note) => (
          <Card key={note._id} style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <CustomToggle eventKey={note._id}>{note.title}</CustomToggle>
              <div>
                <Link to={`/mynotes/${note._id}`}>
                  <Button>Edit</Button>
                </Link>

                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>

            <Accordion.Collapse eventKey={note._id}>
              <Card.Body>
                <h4>
                  <Badge bg="success" style={{ color: "white" }}>
                    {note.category}
                  </Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <Markdown>{note.content}</Markdown>
                  <footer className="blockquote-footer">
                    Created on {dateConvert(note.createdAt)}
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </MainScreen>
  );
};

export default MyNotes;
