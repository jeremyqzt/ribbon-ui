import React from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { useWindowDimensions } from "../../hooks";
import { monthName } from "../../constants/constants";
import { getTotalCosts, getAverageCosts } from "../../utils/analyticsUtils";
import { useFetch } from "../../hooks/index";

export const TotalCostsChart = () => {
  const dims = useWindowDimensions();

  const { response: chartResp } = useFetch(getTotalCosts);

  const { response: avgChartResp } = useFetch(getAverageCosts);

  const d = new Date();
  d.setDate(1);
  const dateArr = [];
  let max = 0;
  let maxAvg = 0;

  for (let i = 0; i <= 11; i++) {
    dateArr.push({
      name: monthName[d.getMonth()] + " " + d.getFullYear(),
      Total: (
        (chartResp || []).find((item) => {
          return (
            item?.month - 1 === d.getMonth() && d.getFullYear() === item?.year
          );
        })?.total || 0
      ).toFixed(2),
      Average: (
        (avgChartResp || []).find((item) => {
          return (
            item?.month - 1 === d.getMonth() && d.getFullYear() === item?.year
          );
        })?.average || 0
      ).toFixed(2),
    });
    d.setMonth(d.getMonth() - 1);
    max = Math.max(max, dateArr[dateArr.length - 1].Total);
    maxAvg = Math.max(maxAvg, dateArr[dateArr.length - 1].Average);
  }

  const realMax = Math.max(max, maxAvg);

  return (
    <ComposedChart
      width={dims.width * 0.85}
      height={500}
      data={dateArr.reverse()}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis
        yAxisId="left"
        domain={[0, Math.round(realMax * 1.2)]}
        label={{
          value: "Amount ($)",
          angle: -90,
          position: "insideLeft",
        }}
      />

      <Tooltip />
      <Legend />
      <Bar yAxisId="left" type="monotone" dataKey="Total" fill="#8884d8" />
      <Bar yAxisId="left" type="monotone" dataKey="Average" fill="#82ca9d" />
    </ComposedChart>
  );
};
