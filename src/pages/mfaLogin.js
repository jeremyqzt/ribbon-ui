import QRCode from "qrcode";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { createMfa, isMfaEnabled, verifyMfa } from "../utils/index";
import Header from "../components/header";
import { useFetch } from "../hooks/index";

import "../style/profile.css";

import { NotificationContainer } from "react-notifications";
import { Footer } from "../components/footer/footer";

export const MFAPage = () => {
  const [qr, setQr] = useState(null);
  const [verifyCode, setVerifyCode] = useState(null);

  const { response: isMFA = false, loading: isMFALoading } =
    useFetch(isMfaEnabled);

  const generateQR = async (text) => {
    try {
      const ret = await QRCode.toDataURL(text);
      return ret;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isMFALoading && isMFA) {
      window.location.href = "/";
    }
  }, [isMFALoading, isMFA]);

  useEffect(() => {
    isMfaEnabled((res) => {
      return;
    });
    createMfa().then((res) => {
      generateQR(res).then((ret) => {
        setQr(ret);
      });
    });
  }, []);

  return (
    <>
      <Header activeId={-1} />
      <NotificationContainer />
      <Container className={"receipt_container"}>
        <Row className="flex justify-content-md-center">
          <Col className=" d-flex justify-content-md-center">
            <h3 className="mt-4 mb-3">Provide the code from you authenticator app.</h3>
          </Col>
        </Row>

        <Row className="flex justify-content-md-center">
          <Col className="d-flex justify-content-md-center">
            <img src={qr} alt={qr} />
          </Col>
        </Row>

        <Row className="flex justify-content-md-center">
          <Col className=" d-flex justify-content-md-center">
            <p className="mt-4 mb-3">
              You have enabled 2-factor authentication on your account. You're current session will expire in 45 seconds. Please provide the 2-factor code to continue your session.
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
                  verifyMfa(verifyCode).then((res) => {
                    window.location.hres = "/settings";
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
