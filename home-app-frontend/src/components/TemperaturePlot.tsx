//import React from "react";

// Define an interface for the temperature data structure
interface TemperatureData {
  date: string;
  temperature_readings: number[];
}

// Define props interface for TemperaturePlot component
interface TemperaturePlotProps {
  temperatureData: TemperatureData[];
}

const TemperaturePlot = ({ temperatureData }: TemperaturePlotProps) => {
  return (
    <div>
      <h1>Temperature Data</h1>
      <ul>
        {temperatureData.map((element, index) => (
          <li key={index}>
            Date: {element.date}, Temperatures:{" "}
            {element.temperature_readings.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemperaturePlot;
