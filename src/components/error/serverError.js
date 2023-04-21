import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import logoPlaceholder from "../../assets/logo-placeholder.png";

const ServerError = () => {
  const refresh = () => {
    window.location.reload(false);
  };

  return (
    <>
      <Row style={{ marginTop: "5%" }}></Row>
      <Row>
        <Col xs={12} className={"d-flex justify-content-center"}>
          <h1>Opps, we ran into an error!</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className={"d-flex justify-content-center"}>
          <img style={{ width: 350 }} src={logoPlaceholder} alt={"Opps, Loading Failed!"} />
        </Col>
      </Row>

      <Row>
        <Col xs={12} className={"d-flex justify-content-center"}>
          <h4>🤔 Lets refresh the page and see if that fixes it.</h4>
        </Col>
        <Col xs={12} className={"d-flex justify-content-center"}>
          <h4>
            Click{" "}
            <button
              onClick={refresh}
              style={{
                background: "none!important",
                border: "none",
                padding: " 0!important",
                /*input has OS specific font-family*/
                color: "#069",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              here
            </button>{" "}
            to refresh the page!
          </h4>
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          className={"d-flex justify-content-center"}
          style={{ marginTop: "20%" }}
        >
          <p>
            If refreshing the page didn't help, please 📃{" "}
            <a href="https://github.com/jeremyqzt/receipts/issues">submit a bug report</a>.
          </p>
        </Col>
      </Row>
    </>
  );
};

export default ServerError;
