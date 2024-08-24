import { Button, Col, Form, Row } from "react-bootstrap";
import MainScreen from "../MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ErrorMessage from "../../Components/ErrorMessage";
import Loading from "../../Components/Loader/Loading";
import { useNavigate } from "react-router-dom";
import { userUpdateFail } from "../../features/user/userUpdateSlice";
import { userUpdate } from "../../features/user/user";
import "./Profile.css";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, success, error, picError } = useSelector(
    (state) => state.userUpdate
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(userUpdateFail("Passwords do not match!"));
    } else {
      const user = { name };
      if (password) {
        user.password = password;
      }
      dispatch(userUpdate(user, file));
      // navigate("/mynotes");
    }
  };

  return (
    <MainScreen title="Edit Profile">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {success && (
              <ErrorMessage variant="success">
                Updated Successfully
              </ErrorMessage>
            )}

            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Enter new password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  placeholder="Enter password again"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              {picError && (
                <ErrorMessage variant="warning">{picError}</ErrorMessage>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={userInfo.pic}
              alt={userInfo.name}
              className="profilePic"
            />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default Profile;
