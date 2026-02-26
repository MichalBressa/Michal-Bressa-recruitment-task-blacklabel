import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import type { JsonData } from "../Types/types";
import data from "../../../data.json";

interface ChartDatum {
  id: string;
  label: string;
  value: number;
  percentage: number;
  color: string;
}

const categoryColors: Record<string, string> = {
  Electronics: "#51cbcf",
  Home: "#fa938e",
  Sports: "#98bf45",
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

function buildChartData(dataset: JsonData) {
  const categoryMap: Record<
    string,
    { total: number; subcategories: Record<string, number> }
  > = {};

  for (const order of dataset.orders) {
    const value = order.quantity * order.unitPrice;

    categoryMap[order.category] ??= {
      total: 0,
      subcategories: {},
    };

    categoryMap[order.category].total += value;

    categoryMap[order.category].subcategories[order.subcategory] =
      (categoryMap[order.category].subcategories[order.subcategory] ?? 0) +
      value;
  }

  const totalRevenue = Object.values(categoryMap).reduce(
    (sum, c) => sum + c.total,
    0,
  );

  // INNER RING / Categories
  const categoryData: ChartDatum[] = Object.entries(categoryMap).map(
    ([category, info]) => ({
      id: category,
      label: category,
      value: info.total,
      percentage: (info.total / totalRevenue) * 100,
      color: categoryColors[category],
    }),
  );

  // OUTER RING / Subcategories
  const subcategoryData: ChartDatum[] = Object.entries(categoryMap).flatMap(
    ([category, info]) => {
      const baseColor = categoryColors[category];
      const subEntries = Object.entries(info.subcategories);

      return subEntries.map(([subcategory, value], index) => ({
        id: `${category}-${subcategory}`,
        label: subcategory,
        value,
        percentage: (value / info.total) * 100,
        color: hexToRgba(baseColor, 0.6 + index * 0.1),
      }));
    },
  );

  return { categoryData, subcategoryData, totalRevenue };
}

const { categoryData, subcategoryData, totalRevenue } = buildChartData(data);

//CENTER LABEL
const StyledText = styled("text")(({ theme }: { theme: Theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 18,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();

  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function OrdersPie(): React.ReactElement {
  const innerRadius = 60;
  const middleRadius = 130;

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom color="black">
        Revenue by Category & Subcategory
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", height: 420 }}>
        <PieChart
          series={[
            {
              innerRadius,
              outerRadius: middleRadius,
              data: categoryData,
              arcLabel: (item) =>
                `${item.label} (${(item as any).percentage.toFixed(0)}%)`,
              valueFormatter: ({ value }) => `€${value.toFixed(2)}`,
              highlightScope: { fade: "global", highlight: "item" },
              highlighted: { additionalRadius: 3 },
              cornerRadius: 4,
            },
            {
              innerRadius: middleRadius,
              outerRadius: middleRadius + 25,
              data: subcategoryData,
              arcLabel: (item) =>
                `${item.label} (${(item as any).percentage.toFixed(0)}%)`,
              valueFormatter: ({ value }) => `€${value.toFixed(2)}`,
              arcLabelRadius: 170,
              highlightScope: { fade: "global", highlight: "item" },
              highlighted: { additionalRadius: 3 },
              cornerRadius: 4,
            },
          ]}
          hideLegend
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontSize: 11,
            },
          }}
        >
          <PieCenterLabel>€{totalRevenue.toFixed(0)}</PieCenterLabel>
        </PieChart>
      </Box>
    </Box>
  );
}
