import React, { useState } from "react";

import Table from "react-bootstrap/Table";
import { getTotalMonthlyCosts } from "../../utils/analyticsUtils";
import { useFetch } from "../../hooks/index";
import { categories, monthName } from "../../constants/constants";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CSVLink } from "react-csv";

export const CategoryMonthCostTable = () => {
  const { response: gridResp } = useFetch(getTotalMonthlyCosts);
  const [field, setField] = useState([]);
  const transformedCategories = {};

  (gridResp || []).forEach((item) => {
    transformedCategories[`${item.year}-${item.month}-${item.category}`] =
      item.total;
  });

  const monthArr = [];
  const d = new Date();
  d.setDate(1);
  for (let i = 0; i <= 11; i++) {
    monthArr.push({
      monthNum: d.getMonth() + 1,
      year: d.getFullYear(),
      monthName: monthName[d.getMonth()],
    });
    d.setMonth(d.getMonth() - 1);
  }

  const usableCategories = categories.map((c) => ({
    key: c.value,
    label: c.name,
  }));
  const data = [
    ['Categories', ...(field.length > 0 ? field : categories.map((c) => c.value)).map(
      (v) => categories[Number(v) - 1]?.name
    )],
    ...monthArr.map((m) => {
      return [
        `${m.monthName}, ${m.year}`,
        ...(field.length > 0 ? field : categories.map((c) => c.value)).map(
          (c) =>
            `$${transformedCategories[`${m.year}-${m.monthNum}-${c}`] ?? 0}`
        ),
      ];
    }),
  ];


  return (
    <>
      <Container>
        <Row className="justify-content-md-end mb-3">
          <Col xs={5}>
            <CSVLink data={data} filename={"ribbon-monthly-expenses.csv"}>
              Download Table
            </CSVLink>
          </Col>
          <Col xs={1}>
            <p style={{ fontSize: 18, fontWeight: "bold", lineHeight: "36px" }}>
              Filters:
            </p>
          </Col>
          <Col xs={6}>
            <DropdownMultiselect
              options={usableCategories}
              handleOnChange={(selected) => {
                setField(selected);
              }}
              name="Categories To Show"
            />
          </Col>
        </Row>
      </Container>
      <Table responsive>
        <thead>
          <tr>
            <th>Categories</th>
            {(field.length > 0 ? field : categories.map((c) => c.value)).map(
              (v, index) => {
                return <th key={index}>{categories[Number(v) - 1]?.name}</th>;
              }
            )}
          </tr>
        </thead>
        <tbody>
          {monthArr.map((m) => {
            return (
              <tr>
                <td>{`${m.monthName}, ${m.year}`}</td>
                {(field.length > 0
                  ? field
                  : categories.map((c) => c.value)
                ).map((c, index) => {
                  return (
                    <td key={index}>{`$${
                      transformedCategories[`${m.year}-${m.monthNum}-${c}`] ?? 0
                    }`}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
