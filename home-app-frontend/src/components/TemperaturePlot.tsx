//import React from "react";
import "./temperaturePlot.css"
// Define an interface for the temperature data structure
interface TemperatureData {
  Time: String;
  Temps: String[];
}

// Define props interface for TemperaturePlot component
interface TemperaturePlotProps {
  data: TemperatureData[];
}

const TemperaturePlot = ({ data }: TemperaturePlotProps) => {
  // Creates arrays containing time and sensorvalues. Separating them to prepare for plotting.
  // The index in these two arrays match, meaning sensorValues[0] belongs together with timeData[0]
  const sensorValues: String[][] = [];
  const timeData = data.map((item) => item.Time);
  for(let i = 0; i < 5; i++){
    const sensorReadings: String[] = [];
    for(let j = 0; j < data.length; j++){
      const temperatureReading = data[j].Temps[i];
      sensorReadings.push(temperatureReading);
    }
    sensorValues.push(sensorReadings);
  }

  

  return (
    <div className="container">
      <div className="tempPlots">
        <ul>
          {sensorValues.map((item, index) => (
            <li key = {index}>
              <span>{`Sensor ${index+1}: `}</span>
              {item.join(", ")}

            </li>
          ))}


        </ul>
        <ul className="timeInfo">
          {timeData.map((item, index) => (
            <li key = {index}>
              <span>{`Measurement ${index+1}: `}</span>
              {item}

            </li>
          ))}


        </ul>



      </div>
      <div className="sensordata">
        <h3>Sensordata</h3>
        <ul>
        {data.map((item, index) =>(
          <li key={index}>
            {`Time: ${item.Time}, Temps: ${item.Temps.join(", ")}`}
          </li>
        ))}


        </ul>
      </div>
      
      
    </div>
  );
};

export default TemperaturePlot;
