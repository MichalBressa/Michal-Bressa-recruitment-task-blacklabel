import { useMemo } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
import data from "../../../data.json";
import { mapOrdersToBubbleSeries } from "../Utils/dataUtils";

const BubbleChartComponent = () => {
  const series = useMemo(() => mapOrdersToBubbleSeries(data), []);

  const options: Highcharts.Options = {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
    },

    title: {
      text: "Order delivery time & location",
    },

    xAxis: {
      title: { text: "Longitude" },
      gridLineWidth: 1,
    },

    yAxis: {
      title: { text: "Latitude" },
    },

    tooltip: {
      pointFormat:
        "lon: {point.x}, lat: {point.y}, city: {point.city}<br/>" +
        "delivery time: {point.w} days<br/>" +
        "order value: €{point.v}",
    },

    series,
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} width="500px" />
  );
};

export default BubbleChartComponent;
