import Header from "../components/header";
import ErrorLogo from "../components/error/errorLogo";

import "../style/receiptContainer.css";

import Container from "react-bootstrap/Container";
import {Footer} from '../components/footer/footer';

export const ErrorPage = () => {
  return (
    <>
      <Header />
      <Container className={"receipt_container"}>
        <ErrorLogo />
      </Container>
      <Footer />
    </>
  );
};
