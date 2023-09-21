import QRCode from "qrcode";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { createMfa } from "../utils/index";
import Header from "../components/header";
import { SettingsForm } from "../components/settings/settings";

import "../style/profile.css";

import { NotificationContainer } from "react-notifications";
import {Footer} from '../components/footer/footer';

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
      <Header activeId={3} />
      <NotificationContainer />
      <Container className={"receipt_container"}>
        <img src={qr} />
      </Container>
      <Footer />
    </>
  );
};
