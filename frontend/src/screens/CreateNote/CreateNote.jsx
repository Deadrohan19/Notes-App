import { Button, Card, Col, Form, Row } from "react-bootstrap";
import MainScreen from "../MainScreen";
import ErrorMessage from "../../Components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as Showdown from "showdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import Loading from "../../Components/Loader/Loading";
import { createNote } from "../../features/notes/notes";
import { useNavigate } from "react-router-dom";
import {
  createNoteFail,
  createNoteReset,
} from "../../features/notes/createNoteSlice";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");
  const { error, loading, notesInfo } = useSelector(
    (state) => state.createNote
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(createNoteReset());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content) {
      dispatch(createNoteFail("Title and Content can't be empty!"));
      return;
    }
    dispatch(createNote(title, content, category));
    console.log(notesInfo);
    resetHandler();
    navigate("/mynotes");
  };

  return (
    <MainScreen title="Create Note">
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
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
              Create Note
            </Button>
            <Button variant="danger" onClick={resetHandler} className="mx-2">
              Reset
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreateNote;
