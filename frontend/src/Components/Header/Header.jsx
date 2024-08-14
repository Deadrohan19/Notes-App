import {
  Container,
  Form,
  FormControl,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../features/login/userLoginSlice";

function Header({ setSearch }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tmp = localStorage.getItem("userInfo");
  const userInfo = tmp !== null ? JSON.parse(tmp) : "";

  const handleLogout = () => {
    dispatch(userLogout());
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="bg-body-tertiary justify-content-between"
    >
      <Container>
        <Navbar.Brand>
          <Link to="/">Note Zipper</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {userInfo ? (
            <Nav className="m-auto">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="search"
                  className="mr-sm-2"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            </Nav>
          ) : (
            <div className="m-auto"></div>
          )}

          {userInfo ? (
            <Nav>
              <Nav.Link>
                <Link to="/mynotes">My Notes</Link>
              </Nav.Link>
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/profile">My Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="d-flex">
              <Nav.Link>
                <Link to="/login">Sign in</Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
