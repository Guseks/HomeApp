//import axios from "axios";
import { useEffect, useState } from "react";
<<<<<<< Updated upstream
import TemperaturePlot from "./components/TemperaturePlot/TemperaturePlot";
import "./App.css";
=======
import TemperaturePlot from "./components/TemperaturePlot";
import StatPlot from "./components/StatPlot";
import "./App.css"
>>>>>>> Stashed changes

interface TemperatureData {
  Time: String;
  Temps: String[];
}

interface StatData {
  maxRadOut: String, 
  minOutdoorTemp: String, 
  maxOutdoorTemp: String, 
  maxVpOut: String
}


const App = () => {
  const [temperatureData, setTemperatureData] = useState<TemperatureData[]>([]);
  const [statData, setStatData] = useState<StatData[]>([]);

  // Code for generating test Data used for development.
  useEffect(() => {
    generateTestData();
  }, []);

  const getCurrentDateTime = (index: number) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String((now.getHours() + index) % 24).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const generateTestData = () => {
    let testData: string[][] = [];
    for (let i = 0; i < 24; i++) {
      let data: string[] = [];
      const temperatureReadings: string[] = Array.from({ length: 5 }, () =>
        (Math.random() * (50 - 15) + 15).toFixed(1)
      );
      data.push(getCurrentDateTime(i));
      data.push(...temperatureReadings);
      testData = [...testData, data];
    }
    setTemperatureData(fixData(testData));
  };

  // Code used to fetch data from Backend. Uncomment when Ready
  /*
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

      try {
        const response = await axios.get(
          "http://localhost:5000/min_max_temperature_data"
        );
        const data = response.data;
        const modifiedData: StatData[] = fixStatData(data);
        setStatData(modifiedData);
      } catch (error) {
        console.error("Error fetching min max values : ", error);
      }

    };

    fetchTemperatureData();

    setInterval(()=>{
      fetchTemperatureData();
    }, 5000)
  }, []);
  */

  const fixData = (rawData: Array<String[]>): TemperatureData[] => {
    const fixedData: TemperatureData[] = rawData.map((item: String[]) => {
      const time = item[0];
      const temps = item.slice(1);
      return { Time: time, Temps: temps };
    });
    return fixedData;
  };

<<<<<<< Updated upstream
=======
  const fixStatData = (rawData: Array<String[]>): StatData[] => {
    const fixedData: StatData[] = rawData.map((item: String[]) => {
      return {maxRadOut: item[0], minOutdoorTemp: item[1], maxOutdoorTemp: item[2], maxVpOut: item[3]}
    });
    return fixedData;
  }


  
  /*
>>>>>>> Stashed changes
  return (
    <div className="app">
      <h2 className="app-headline">Temperature Measurement App</h2>
      <div className="content-container">
        <TemperaturePlot data={temperatureData} />
      </div>
    </div>
<<<<<<< Updated upstream
  );
=======
    
    <h2>Statistics</h2>
    <div>
//      <StatPlot data={statData} />
    </div>
   
    
  </div>
 );
>>>>>>> Stashed changes
};

export default App;
