import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import logoPlaceholder from "../../assets/logo-placeholder.png";
import { useNavigate } from "react-router-dom";

const EmptyLogo = () => {
  const navigate = useNavigate();

  const goUpload = () => {
    navigate("/upload");
  };

  return (
    <>
      <Row style={{ marginTop: "10%" }}></Row>
      <Row>
        <Col xs={12} className={"d-flex justify-content-center"}>
          <h1>Much Empty!</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className={"d-flex justify-content-center"}>
          <img style={{ width: 350 }} src={logoPlaceholder} alt={"Opps, Loading Failed!"}/>
        </Col>
      </Row>

      <Row>
        <Col xs={12} className={"d-flex justify-content-center"}>
          <h4>Such Wow</h4>
        </Col>
        <Col xs={12} className={"d-flex justify-content-center"}>
          <h4>
            Click{" "}
            <button
              onClick={goUpload}
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
            to upload your first receipt!
          </h4>
        </Col>
      </Row>
    </>
  );
};

export default EmptyLogo;
