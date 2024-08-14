import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const {userInfo} = useSelector((state) => state.userLogin);

  useEffect(() => {
    if(userInfo){
      navigate("/mynotes");
    }
  }, [navigate, userInfo])
  
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Note Zipper</h1>
              <p className="subtitle">Safe haven for all your notes!</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingButton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  size="lg"
                  className="landingButton"
                  variant="outline-primary"
                >
                  Register
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
