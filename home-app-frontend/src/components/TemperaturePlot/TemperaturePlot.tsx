//import React from "react";
import "./temperaturePlot.css";
import PlotCard from "../PlotCard/PlotCard";
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
  for (let i = 0; i < 5; i++) {
    const sensorReadings: String[] = [];
    for (let j = 0; j < data.length; j++) {
      const temperatureReading = data[j].Temps[i];
      sensorReadings.push(temperatureReading);
    }
    sensorValues.push(sensorReadings);
  }

  return (
    <div className="container">
      <div className="tempPlots">
        <PlotCard />
        <PlotCard />
        <PlotCard />
      </div>
      <div className="tempData">
        <div className="sortedData">
          <h3>Fixed Sensordata</h3>
          <ul>
            {sensorValues.map((item, index) => (
              <li key={index}>
                <span>{`Sensor ${index + 1}: `}</span>
                {item.join(", ")}
              </li>
            ))}
          </ul>
        </div>

        <div className=" time-and-object">
          <div className="timeInfo">
            <h3>Timedata</h3>
            <ul>
              {timeData.map((item, index) => (
                <li key={index}>
                  <span>{`Measurement ${index + 1}: `}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="sensordata">
            <h3>Sensordata</h3>
            <ul>
              {data.map((item, index) => (
                <li key={index}>
                  {`Time: ${item.Time}, Temps: ${item.Temps.join(", ")}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperaturePlot;
