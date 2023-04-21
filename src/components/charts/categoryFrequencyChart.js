import React from "react";
import { Pie, PieChart, Legend } from "recharts";
import { getReceiptCategoryCount } from "../../utils/analyticsUtils";
import { useFetch } from "../../hooks/index";
import { useWindowDimensions } from "../../hooks";
import {categories} from "../../constants/constants";

export const CategoryFreqChart = () => {
  const {
    response: categoryDataRaw,
  } = useFetch(getReceiptCategoryCount);

  const COLORS = ['#D9BBF9', '#CCA7A2', '#AA9FB1', '#7871AA', '#7871AA', '#4E5283'];

  const categoryData = (categoryDataRaw || []).map((item, idx) => {
    return {
      name: categories[(item.category || 1) - 1].name,
      value: item.total,
      fill: COLORS[idx] || COLORS[0],
    };
  });
  const dims = useWindowDimensions();

  return (
    <PieChart width={dims.width / 4} height={dims.width / 4}>
      <Legend />
      <Pie
        data={categoryData}
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
