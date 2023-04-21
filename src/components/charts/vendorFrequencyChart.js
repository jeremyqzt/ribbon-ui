import React from "react";
import { Pie, PieChart, Legend } from "recharts";
import { getVendorCount } from "../../utils/analyticsUtils";
import { useFetch } from "../../hooks/index";
import { useWindowDimensions } from "../../hooks";

export const VendorFreqChart = () => {
  const {
    response: vendorCountResp,
  } = useFetch(getVendorCount);

  const COLORS = ['#8884d8', '#3DCC91', '#FFB366', '#FF7373', '#FFCC00', '#3B22FF'];

  const vendorData = (vendorCountResp || []).map((item, idx) => {
    return {
      name: item.vendor || "N/A",
      value: item.total,
      fill: COLORS[idx] || COLORS[0],
    };
  });
  const dims = useWindowDimensions();

  return (
    <PieChart width={dims.width / 4} height={dims.width / 4}>
      <Legend />
      <Pie
        data={vendorData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label={true}
        isAnimationActive={false} 
      />
    </PieChart>
  );
};
