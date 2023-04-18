import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { CategoryMonthCostTable } from "./categoryMonthlyCostTable";
export const MonthlyTotalsGrid = () => {
  return (
    <>
      <Row style={{ marginTop: "5%", paddingRight: "5%", paddingLeft: "5%" }}>
        <Col xs={12} className={"d-flex flex-column justify-content-center"}>
          <Row className={"d-flex justify-content-center"}>
            <Col className={"mb-4"} style={{ textAlign: "center" }} xs={12}>
              <h2>Total Expenses By Category</h2>
            </Col>
          </Row>
          <Row className={"d-flex justify-content-center"}>
            <CategoryMonthCostTable />
          </Row>
        </Col>
      </Row>
    </>
  );
};
