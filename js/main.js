const buttonsButtom = document.querySelectorAll(".slider__bottom-btn");

const handleContentLoaded = () => {
  const firstButtonCheckWeather = buttonsButtom[0];
  firstButtonCheckWeather.classList.add("active-btn-bottom");

  const labels = ["2 p.m.", "3 p.m.", "4 p.m.", "5 p.m.", "6 p.m.", "7 p.m."];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
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

  const handleClickButtonCheckWeather = (e) => {
    buttonsButtom.forEach((item) => {
      item.classList.remove("active-btn-bottom");
    });

    const btn = e.target;
    btn.classList.add("active-btn-bottom");
  };

  buttonsButtom.forEach((item) => {
    item.addEventListener("click", (e) => handleClickButtonCheckWeather(e));
  });
};

window.addEventListener("DOMContentLoaded", handleContentLoaded);
