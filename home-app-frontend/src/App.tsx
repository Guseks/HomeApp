import axios from "axios";
import { useEffect, useState } from "react";
import TemperaturePlot from "./components/TemperaturePlot";
import "./App.css"

interface TemperatureData {
  Time: String,
  Temps: String[]
}

const App = () => {
  const [temperatureData, setTemperatureData] = useState<TemperatureData[]>([]);

  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/temperature_data"
        );
        const data = response.data;
        const modifiedData: TemperatureData[] = fixData(data);
        setTemperatureData(modifiedData);
      } catch (error) {
        console.error("Error fetching elevator states: ", error);
      }
    };

    fetchTemperatureData();

    setInterval(()=>{
      fetchTemperatureData();
    }, 5000)
  }, []);

  const fixData = (rawData: Array<String[]>): TemperatureData[] => {
    const fixedData: TemperatureData[] = rawData.map((item: String[]) => {
      const time = item[0];
      const temps = item.slice(1);
      return {Time: time, Temps: temps}
    });
    return fixedData;
  }

  
  /*
  return (
    
  );
  */
 
 return (
  <div className="app">
    <h2>Temperature Measurement App</h2>
    <div>
      <TemperaturePlot data={temperatureData} />
    </div>
    
    

    
    
  </div>
 );
};

export default App;
