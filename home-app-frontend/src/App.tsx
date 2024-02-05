import axios from "axios";
import { useEffect, useState } from "react";
import TemperaturePlot from "./components/TemperaturePlot/TemperaturePlot";
import "./App.css";

interface TemperatureData {
  Time: string;
  Temps: string[];
}
/*
interface StatData {
  maxRadOut: string;
  minOutdoorTemp: string;
  maxOutdoorTemp: string;
  maxVpOut: string;
}
*/

const App = () => {
  const [temperatureData, setTemperatureData] = useState<TemperatureData[]>([]);

  // Code used to fetch data from Backend. Uncomment when Ready
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
        console.error("Error fetching temperature values : ", error);
      }
    };
    /*
    const fetchStatData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/min_max_temperature_data"
        );
        const data = response.data;
        console.log(data);
        //const modifiedData: StatData[] = fixStatData(data);
        //setStatData(modifiedData);
      } catch (error) {
        console.error("Error fetching min max values : ", error);
      }
    };
    */

    fetchTemperatureData();
    //    fetchStatData();

    setInterval(() => {
      fetchTemperatureData();
      //      fetchStatData();
    }, 5000);
  }, []);

  const fixData = (rawData: Array<string[]>): TemperatureData[] => {
    const fixedData: TemperatureData[] = rawData.map((item: string[]) => {
      const time = item[0];
      const temps = item.slice(1);
      return { Time: time, Temps: temps };
    });
    return fixedData;
  };

  /*
  const fixStatData = (data: string[]): StatData => {
    
  };
  */

  return (
    <div className="app">
      <h2 className="app-headline">Temperature Measurement App</h2>
      <div className="content-container">
        <TemperaturePlot data={temperatureData} />
      </div>
    </div>
  );
};

export default App;
