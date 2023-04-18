import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { TotalCostsChart } from "./totalCostChart";
import { VendorFreqChart } from "./vendorFrequencyChart";
import { CategoryFreqChart } from "./categoryFrequencyChart";
const ChartGrid = () => {
  return (
    <>
      <Row style={{ marginTop: "5%" }}>
        <Col xs={12} className={"d-flex flex-column justify-content-center"}>
          <Row className={"d-flex justify-content-center"}>
            <Col className={"mb-4"} style={{ textAlign: "center" }} xs={12}>
              <h2>Total Expenses</h2>
            </Col>
          </Row>
          <Row className={"d-flex justify-content-center"}>
            <TotalCostsChart />
          </Row>
        </Col>
      </Row>
      <Row
        style={{ marginTop: "5%" }}
        className={"d-flex justify-content-center"}
      >
        <Col className={"d-flex flex-column justify-content-center"}>
          <Row className={"d-flex justify-content-center"}>
            <Col className={"mb-4"} style={{ textAlign: "center" }} xs={12}>
              <h3>Vendor Frequency</h3>
            </Col>
          </Row>
          <Row
            style={{ textAlign: "center" }}
            className={"justify-content-center"}
          >
            <VendorFreqChart />
          </Row>
        </Col>
        <Col className={"d-flex flex-column justify-content-center"}>
          <Row className={"d-flex justify-content-center"}>
            <Col className={"mb-4"} style={{ textAlign: "center" }} xs={12}>
              <h3>Category Frequency</h3>
            </Col>
          </Row>
          <Row
            style={{ textAlign: "center" }}
            className={"justify-content-center"}
          >
            <CategoryFreqChart />
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ChartGrid;
