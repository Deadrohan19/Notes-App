import { Button, Card, Col, Form, Row } from "react-bootstrap";
import MainScreen from "../MainScreen";
import ErrorMessage from "../../Components/ErrorMessage";
import Loading from "../../Components/Loader/Loading";
import ReactMde from "react-mde";
import { useEffect, useState } from "react";
import Showdown from "showdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteNote,
  getSingleNote,
  updateNote,
} from "../../features/notes/notes";
import "./SingleNote.css";

const SingleNote = () => {
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading: updateLoading, error: updateError } = useSelector(
    (state) => state.updateNote
  );
  const { loading: deleteLoading, error: deleteError } = useSelector(
    (state) => state.deleteNote
  );

  const {
    notesInfo,
    loading: fetchingLoading,
    error: fetchingError,
  } = useSelector((state) => state.getNote);

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };
  
  const dateConvert = (timestamp) => {
    const tmpDate = new Date(timestamp);
    const localDate = tmpDate.toLocaleString();
    return localDate;
  };

  useEffect(() => {
    setTitle(notesInfo.title);
    setCategory(notesInfo.category);
    setContent(notesInfo.content);
    setDate(dateConvert(notesInfo.updatedAt));
  }, [notesInfo]);

  useEffect(() => {
    dispatch(getSingleNote(id));
  }, [dispatch, id]);

  const updateHandler = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    dispatch(updateNote(id, title, content, category));

    resetHandler();
    navigate("/mynotes");
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    if (window.confirm("are you sure?")) {
      dispatch(deleteNote(id));
      resetHandler();
      navigate("/mynotes");
    }
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {updateError && (
              <ErrorMessage variant="danger">{updateError}</ErrorMessage>
            )}
            {fetchingError && (
              <ErrorMessage variant="danger">{fetchingError}</ErrorMessage>
            )}
            {deleteError && (
              <ErrorMessage variant="danger">{deleteError}</ErrorMessage>
            )}
            {(fetchingLoading || updateLoading || deleteLoading) && <Loading />}
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Content</Form.Label>
              <div className="container">
                <Row>
                  <Col>
                    <ReactMde
                      value={content}
                      onChange={setContent}
                      selectedTab={selectedTab}
                      onTabChange={setSelectedTab}
                      generateMarkdownPreview={(markdown) =>
                        Promise.resolve(converter.makeHtml(markdown))
                      }
                    />
                  </Col>
                  <Col>
                    <ReactMde
                      value={content}
                      selectedTab="preview"
                      generateMarkdownPreview={(markdown) =>
                        Promise.resolve(converter.makeHtml(markdown))
                      }
                      readOnly
                    />
                  </Col>
                </Row>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                placeholder="Enter the category (optional)"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button variant="danger" className="mx-2" onClick={deleteHandler}>
              Delete
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="blockquote-footer">
          Updated on - {date}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default SingleNote;
