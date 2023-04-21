import Header from "../components/header";
import ErrorLogo from "../components/error/errorLogo";

import "../style/receiptContainer.css";

import Container from "react-bootstrap/Container";
import { NotificationContainer } from "react-notifications";
import {Footer} from '../components/footer/footer';

export const ProfilePage = () => {
  return (
    <>
      <Header activeId={3} />
      <NotificationContainer />
      <Container className={"receipt_container"}>
        <ErrorLogo />
      </Container>
      <Footer/>
    </>
  );
};
