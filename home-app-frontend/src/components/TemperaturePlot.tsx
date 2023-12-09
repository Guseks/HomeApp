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

  //Split temperature readings into 5 arrays containing info from each sensor. 
  // Data is stored in sensordata array. Each index represents a sensor and its values.
  const sensordata: Number[][] = [];
  for(let i = 0; i < 5; i++){
    const sensorReadings: Number[] = [];
    for(let j = 0; j < temperatureData.length; j++){
      const temperatureReading = temperatureData[j].temperature_readings[i];
      sensorReadings.push(temperatureReading);
    }
    sensordata.push(sensorReadings);
  }
  
  
  console.log(sensordata);
  /*
  {temperatureData.map((element, index) => (
    <li key={index}>
      <h3>Sensor {index}</h3>
      Date: {element.date}, Temperatures:{" "}
      {element.temperature_readings.join(", ")}
    </li>
  ))}
  */

  return (
    <div>
      <h1>Sensordata</h1>
      <ul>

        {sensordata.map((element, index) => (
          <li key={index}>
            <h3>Sensor {index+1}</h3>
            Temperatures:{" "}
            {element.join(", ")}
          </li>
        ))}
        
      </ul>
    </div>
  );
};

export default TemperaturePlot;
