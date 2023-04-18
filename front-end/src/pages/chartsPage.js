import Header from "../components/header";
import ChartGrid from "../components/charts/chartGrid";

import "../style/receiptContainer.css";

import Container from "react-bootstrap/Container";
import { Footer } from "../components/footer/footer";

export const ChartPage = () => {
  return (
    <>
      <Header activeId={4} />
      <Container fluid>
        <ChartGrid />
      </Container>
      <Footer />
    </>
  );
};
