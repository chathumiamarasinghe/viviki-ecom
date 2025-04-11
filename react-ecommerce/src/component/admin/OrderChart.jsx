import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderChart = ({ orders }) => {
 
  console.log("Received orders for chart:", orders);

  
  if (!Array.isArray(orders)) {
    return <p style={{ padding: "1rem", color: "#888" }}>Invalid order data format.</p>;
  }

  if (orders.length === 0) {
    return <p style={{ padding: "1rem", color: "#888" }}>No orders available to display the chart.</p>;
  }

  
  const statusCount = orders.reduce((acc, order) => {
    const status = order?.status?.toUpperCase(); 
    if (status) {
      acc[status] = (acc[status] || 0) + 1;
    }
    return acc;
  }, {});

  
  const chartData = {
    labels: ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"],
    datasets: [{
      label: 'Order Status Count',
      data: [
        statusCount["PENDING"] || 0,
        statusCount["CONFIRMED"] || 0,
        statusCount["SHIPPED"] || 0,
        statusCount["DELIVERED"] || 0,
        statusCount["CANCELLED"] || 0,
        statusCount["RETURNED"] || 0
      ],
      backgroundColor: '#f68b1e',
      borderColor: '#9610c7',
      borderWidth: 1,
      borderRadius: 4,
    }],
  };

  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333'
        }
      },
      title: {
        display: true,
        text: 'Orders by Status',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        }
      }
    },
  };

  return (
    <div className="order-chart" style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default OrderChart;
