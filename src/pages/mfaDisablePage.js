import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { disableMfa, isMfaEnabled } from "../utils/index";
import Header from "../components/header";
import { useFetch } from "../hooks/index";

import "../style/profile.css";

import { NotificationContainer } from "react-notifications";
import { Footer } from "../components/footer/footer";

export const MFADisablePage = () => {
  const [verifyCode, setVerifyCode] = useState(null);

  const { response: isMFA = false, loading: isMFALoading } =
    useFetch(isMfaEnabled);


  useEffect(() => {
    if (!isMFALoading && !isMFA) {
      window.location.href = "/";
    }
  }, [isMFALoading, isMFA]);

  useEffect(() => {
    isMfaEnabled(() => {
      return;
    });
  }, []);

  return (
    <>
      <Header activeId={-1} />
      <NotificationContainer />
      <Container className={"receipt_container"}>
        <Row className="flex justify-content-md-center">
          <Col className=" d-flex justify-content-md-center">
            <h3 className="mt-4 mb-3">Disable 2 Factor Authentication</h3>
          </Col>
        </Row>

        <Row className="flex justify-content-md-center">
          <Col className=" d-flex justify-content-md-center">
            <p className="mt-4 mb-3">
              Disable your 2 Factor authentication. Please enter a code
              genereated by the authenticator app and then hit submit. You will
              be logged out after performing this action.
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
                onClick={() => {
                  disableMfa(verifyCode).then(() => {
                    window.location.href = "/settings";
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
