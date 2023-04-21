import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

const LoadingLogo = () => {
  return (
    <>
      <Row style={{ marginTop: "20%" }}></Row>
      <Row>
        <Col xs={12} className={"d-flex justify-content-center"}>
          <Spinner animation="border" variant="danger" />
          <h1>Just a Sec!</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className={"d-flex justify-content-center"}>
          <h4>We're loading your data!</h4>
        </Col>
      </Row>
    </>
  );
};

export default LoadingLogo;
