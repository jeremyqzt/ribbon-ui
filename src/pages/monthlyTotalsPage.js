import Header from "../components/header";
import { MonthlyTotalsGrid } from "../components/charts/monthlyTotalsGrid";

import "../style/receiptContainer.css";

import Container from "react-bootstrap/Container";
import { Footer } from "../components/footer/footer";

export const MonthlyTotalsPage = () => {
  return (
    <>
      <Header activeId={5} />
      <Container fluid>
        <MonthlyTotalsGrid />
      </Container>
      <Footer />
    </>
  );
};
