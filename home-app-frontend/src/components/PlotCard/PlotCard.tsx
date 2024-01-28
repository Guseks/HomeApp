import "./plotCard.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PlotCardProps {
  timeData: string[];
  temperatureData: string[][];
}

const PlotCard = ({ timeData, temperatureData }: PlotCardProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "black",
          font: {
            size: 14,
            weight: 600,
          },
        },
      },
      title: {
        display: true,
        text: "Temperature Data Line Chart",
        color: "black",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "black",
          font: {
            size: 12,
            weight: 600,
          },
        },
      },
    },
  };

  const colors = [
    "rgb(0, 100, 0)",
    "rgb(200, 0, 0)",
    "rgb(250, 200, 0)",
    "rgb(200, 0, 200)",
    "rgb(50, 100, 200)",
  ];

  const data = {
    labels: timeData, // Assuming timeData is an array of hours, minutes, and seconds
    datasets: temperatureData.map((sensor, index) => ({
      label: `Sensor ${index + 1}`,
      data: sensor,
      borderColor: colors[index],
      backgroundColor: colors[index],
    })),
  };
  //
  return (
    <>
      <div className="plot-card">
        <Line options={options} data={data} />
      </div>
    </>
  );
};

export default PlotCard;
