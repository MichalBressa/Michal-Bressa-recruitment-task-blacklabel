import { useEffect, useState } from "react";
import { calculateCategoryOrdersSummary } from "../Utils/dataUtils";
import type { JsonData } from "../Types/types";
import { BarChart } from "@mui/x-charts/BarChart";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type BarChartSegment = {
  data: number[];
  label: string;
};

export default function BarChartComponent({
  jsonData,
}: {
  jsonData: JsonData;
}) {
  const [newCostumersSegment, setNewCostumersSegment] =
    useState<BarChartSegment | null>(null);
  const [returningCustomersSegment, setReturningCustomersSegment] =
    useState<BarChartSegment | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const orderData = calculateCategoryOrdersSummary(jsonData.orders);

    setCategories(orderData.map((item) => item.category));
    setNewCostumersSegment({
      data: orderData.map((item) => item.newCustomersOrdersPrice),
      label: "New Customers",
    });
    setReturningCustomersSegment({
      data: orderData.map((item) => item.returningCustomersOrdersPrice),
      label: "Returning Customers",
    });
  }, [jsonData]);

  return (
    <>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom color="black">
          Revenue by Category & Costumer type
        </Typography>
        {newCostumersSegment && returningCustomersSegment && (
          <BarChart
            height={300}
            width={600}
            colors={["#1a80bb", "#8cc6e3"]}
            xAxis={[{ data: categories }]}
            series={[
              {
                ...newCostumersSegment,
                stack: "total",
                valueFormatter: (value) => `€${value!.toFixed(2)}`,
              },
              {
                ...returningCustomersSegment,
                stack: "total",
                valueFormatter: (value) => `€${value!.toFixed(2)}`,
              },
            ]}
          />
        )}
      </Box>
    </>
  );
}
