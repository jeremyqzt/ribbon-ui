import Header from "../components/header";
import ServerError from "../components/error/serverError";

import "../style/receiptContainer.css";

import Container from "react-bootstrap/Container";
import {Footer} from '../components/footer/footer';

export const ServerErrorPage = () => {
  return (
    <>
      <Header />
      <Container className={"receipt_container"}>
        <ServerError />
      </Container>
      <Footer />
    </>
  );
};
