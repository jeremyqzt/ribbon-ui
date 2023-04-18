import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Github } from "react-bootstrap-icons";

export const Footer = () => {
  return (
    <Container>
      <Row className={"d-flex justify-content-center mt-5"}>
        <Col className={"d-flex justify-content-center"}>
          Digi Ribbon Receipts, © 2021 - 2022
        </Col>
      </Row>
      <Row className={"d-flex justify-content-center"}>
        <Col className={"d-flex justify-content-center"}>
          <a href="https://github.com/jeremyqzt/receipts">
            <span style={{ verticalAlign: "middle" }}>
              <Github style={{ verticalAlign: "top" }} size={18} />{" "}
            </span>
            <span>Source Code</span>
          </a>
        </Col>
      </Row>
    </Container>
  );
};
