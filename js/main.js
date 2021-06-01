const labels = ["2 p.m.", "3 p.m.", "4 p.m.", "5 p.m.", "6 p.m.", "7 p.m."];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Temperatures",
      backgroundColor: "rgb(255, 99, 0)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30],
      cubicInterpolationMode: "monotone",
    },
  ],
};

const config = {
  type: "line",
  data,
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "rgb(95,95,95)",
        },
      },
    },
  },
};

var myChart = new Chart(document.getElementById("myChart"), config);
