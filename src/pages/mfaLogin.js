import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { logInMfa, signOut } from "../utils/index";
import Header from "../components/header";

import "../style/profile.css";

import { NotificationContainer } from "react-notifications";
import { Footer } from "../components/footer/footer";

export const MFALogin = () => {
  const [loading, setLoading] = useState(false);
  const [remain, setRemain] = useState(45);

  const [verifyCode, setVerifyCode] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemain((o) => o - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (remain <= 0) {
      signOut();
      window.location.href = "/";
    }
  }, [remain]);

  return (
    <>
      <Header activeId={-1} />
      <NotificationContainer />
      <Container className={"receipt_container"}>
        <Row className="flex justify-content-md-center">
          <Col className=" d-flex justify-content-md-center">
            <h3 className="mt-4 mb-3">
              Provide the code from you authenticator app.
            </h3>
          </Col>
        </Row>

        <Row className="flex justify-content-md-center">
          <Col className=" d-flex justify-content-md-center">
            <p className="mt-4 mb-3">
              {`You have enabled 2-factor authentication on your account. You're
              current session will expire in ${remain} seconds. Please provide the
              2-factor code to continue your session.`}
            </p>
          </Col>
        </Row>

        <Row className="flex justify-content-md-center">
          <Col className=" d-flex justify-content-md-center">
            <Col xs={8}>
              <Form.Control
                type="text"
                value={verifyCode}
                placeholder={"Enter Code Here"}
                onChange={(e) => setVerifyCode(e.target.value)}
              />
            </Col>
            <Col xs={2}>
              <Button
                variant="danger"
                disabled={loading}
                onClick={() => {
                  setLoading(true);
                  logInMfa(verifyCode).finally(() => {
                    setLoading(false);
                  });
                }}
              >
                Submit
              </Button>
            </Col>
          </Col>
        </Row>
        <Row></Row>
      </Container>
      <Footer />
    </>
  );
};
