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

function Header({setSearch}) {
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
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand>
          <Link to="/">Note Zipper</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
          <Nav>
            <Nav.Link>
              <Link to="/mynotes">My Notes</Link>
            </Nav.Link>
            <NavDropdown
              title={userInfo.name || "Sign In"}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#profile">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
