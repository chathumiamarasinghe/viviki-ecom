import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ApiService from "../../service/ApiService";

ChartJS.register(ArcElement, Tooltip, Legend);

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
};

const CategoryChart = () => {
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiService.getAllCategory();
        const categories = response.categoryList || [];

        const countMap = {};
        categories.forEach((cat) => {
          countMap[cat.name] = (countMap[cat.name] || 0) + 1;
        });

        const labels = Object.keys(countMap);
        const data = Object.values(countMap);
        const backgroundColors = labels.map(() => getRandomColor());

        setCategoryData({
          labels,
          datasets: [
            {
              label: "Category Distribution",
              data,
              backgroundColor: backgroundColors,
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching category data", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", background: "#fff", padding: "20px", borderRadius: "12px" }}>
      <h4 className="text-center mb-3">Category Distribution</h4>
      {categoryData ? <Pie data={categoryData} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default CategoryChart;
