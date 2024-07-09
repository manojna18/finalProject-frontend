import { Pie } from "react-chartjs-2";
import React from "react";

// import './PieChart.css'

interface Prop {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
    borderWidth: number;
  };
}

const PieChart = ({ chartData }: Prop) => {
  return (
    <div className="PieChart">
      <h2>Your nutrition today</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Your nutrition today",
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
