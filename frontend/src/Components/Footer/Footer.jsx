import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container className="text-center py-3">
        Copyright &copy; {new Date().getFullYear()}
      </Container>
    </footer>
  );
}

export default Footer;
