import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import logoPlaceholder from "../../assets/logo-placeholder.png";

const ErrorLogo = () => {
  const goBack = () => {
    window.history.back();
  };

  const listCookies = () => {
    let theCookies = document.cookie.split(";");
    let aString = "";
    for (let i = 1; i <= theCookies.length; i++) {
      if (!theCookies[i - 1].includes("_token")) {
        aString += i + " " + theCookies[i - 1] + "\n";
      }
    }
    return aString;
  };

  return (
    <>
      <Row style={{ marginTop: "20%" }}></Row>
      <Row>
        <Col xs={12} className={"d-flex justify-content-center"}>
          <h1>404 Not Found!</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className={"d-flex justify-content-center"}>
          <img style={{ width: 350 }} src={logoPlaceholder} alt={"Opps, Loading Failed!"} />
        </Col>
      </Row>

      <Row>
        <Col xs={12} className={"d-flex justify-content-center"}>
          <h4>🤔 Me thinks you got here by mistake.</h4>
        </Col>
        <Col xs={12} className={"d-flex justify-content-center"}>
          <h4>
            Click{" "}
            <button
              onClick={goBack}
              style={{
                background: "none!important",
                border: "none",
                padding: " 0!important",
                color: "#069",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              here
            </button>{" "}
            to get back the the last known location!
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
            If you believe that you're seeing this page in error, please 📃{" "}
            <a href="https://github.com/jeremyqzt/receipts/issues">submit a bug report</a>.
            Please also include the information below.
          </p>
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          className={"d-flex justify-content-center"}
          style={{ marginTop: "5%" }}
        >
          <pre>
            {"Error Context: "}
            {btoa(listCookies())}
            {btoa(window.location.href)}
          </pre>
        </Col>
      </Row>
    </>
  );
};

export default ErrorLogo;
