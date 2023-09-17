import QRCode from "qrcode";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export const MFAPage = () => {
  const [showModal, setShowModal] = useState(false);

  const [qr, setQr] = useState(null);

  const generateQR = async (text) => {
    try {
      const ret = await QRCode.toDataURL(text);
      console.log(await QRCode.toDataURL(text));
      return ret;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (showModal) {
      generateQR(
        "otpauth://totp/5%405.com?secret=asd&algorithm=SHA1&digits=6&period=30"
      ).then((ret) => {
        setQr(ret);
      });
    }
  }, [showModal]);

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
