import axios from "axios";
import { useEffect, useState } from "react";
import TemperaturePlot from "./components/TemperaturePlot";

const App = () => {
  const [temperatureData, setTemperatureData] = useState([]);

  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/temperature_data"
        );
        const data = response.data;
        setTemperatureData(data);
      } catch (error) {
        console.error("Error fetching elevator states: ", error);
      }
    };

    fetchTemperatureData();
  }, []);
  return (
    <div>
      <TemperaturePlot temperatureData={temperatureData} />
    </div>
  );
};

export default App;
