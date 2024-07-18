import { Pie } from "react-chartjs-2";

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
              text: "Macros percentage",
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
