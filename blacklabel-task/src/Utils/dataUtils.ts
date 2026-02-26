import type { CategoryOrdersSummary, Order, JsonData } from "../Types/types";
import * as Highcharts from "highcharts";

const CATEGORY_COLORS: Record<string, string> = {
  Electronics: "#51cbcf",
  Home: "#fa938e",
  Sports: "#98bf45",
};

export const calculateCategoryOrdersSummary = (
  orders: Order[],
): CategoryOrdersSummary[] => {
  const categoryMap: Record<string, CategoryOrdersSummary> = {};
  for (const order of orders) {
    // create category bucket if not exists
    if (!categoryMap[order.category]) {
      categoryMap[order.category] = {
        category: order.category,
        newCustomersOrders: 0,
        returningCustomersOrders: 0,
        newCustomersOrdersPrice: 0,
        returningCustomersOrdersPrice: 0,
      };
    }
    if (order.customerType === "new") {
      categoryMap[order.category].newCustomersOrders++;
      categoryMap[order.category].newCustomersOrdersPrice +=
        order.quantity * order.unitPrice;
    } else {
      categoryMap[order.category].returningCustomersOrders++;
      categoryMap[order.category].returningCustomersOrdersPrice +=
        order.quantity * order.unitPrice;
    }
  }
  return Object.values(categoryMap);
};

export function mapOrdersToBubbleSeries(
  dataset: JsonData,
): Highcharts.SeriesBubbleOptions[] {
  const categoryMap: Record<string, Highcharts.PointOptionsObject[]> = {};

  for (const order of dataset.orders) {
    const orderValue = order.quantity * order.unitPrice;

    if (!categoryMap[order.category]) {
      categoryMap[order.category] = [];
    }

    categoryMap[order.category].push({
      x: order.lon,
      y: order.lat,
      z: order.deliveryDays * 5,

      //@ts-ignore
      city: order.city,
      w: order.deliveryDays,
      v: orderValue,
    });
  }

  return Object.entries(categoryMap).map(([category, data]) => ({
    type: "bubble",
    name: category,
    data,

    color: CATEGORY_COLORS[category] ?? "#cccccc",
  }));
}
