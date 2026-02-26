import "./App.css";
import jsonData from "../../data.json";
import BarChartComponent from "./Components/BarChart";
import NavbarComponent from "./Components/Navbar";
import PieChartComponent from "./Components/PieChart";
import BubbleChartComponent from "./Components/BubbleChart";

function App() {
  return (
    <>
      <NavbarComponent />
      <div className="chartsContainer">
        <BarChartComponent jsonData={jsonData} />
        <PieChartComponent />
        <BubbleChartComponent />
        <p>Based on data generated on {jsonData.meta.generatedAt}</p>
      </div>
    </>
  );
}

export default App;
