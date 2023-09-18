import QRCode from "qrcode";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { createMfa } from "../utils/index";

export const MFAPage = () => {
  const [qr, setQr] = useState(null);

  const generateQR = async (text) => {
    try {
      const ret = await QRCode.toDataURL(text);
      return ret;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    createMfa().then((res) => {
      generateQR(res).then((ret) => {
        setQr(ret);
      });
    });
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col xs={6}>
            <img src={qr} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
