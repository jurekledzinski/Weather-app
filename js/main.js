const sliderBoxes3 = document.querySelectorAll(".slider__box-3");
const sliderBoxes3Mobile = document.querySelectorAll(".slider__box-3-mobile");
const sliderBoxes4 = document.querySelectorAll(".slider__box-4");
const sliderBoxesDays4 = document.querySelectorAll(".slider__box-4-days");
const detailsTitle = document.querySelector(".slider__box-4-title");

const detailsWeather = document.querySelectorAll(
  ".slider__box-4-boxes,.slider__box-4-boxes--days-forecast,.slider__box-4-boxes--hourly-weather"
);

const innerBoxFour = document.querySelector(".slider__inner-box-4");

const buttonsButtom = document.querySelectorAll(".slider__bottom-btn");

const handleContentLoaded = () => {
  const firstButtonCheckWeatherDetails = buttonsButtom[0];
  firstButtonCheckWeatherDetails.classList.add("active-btn-bottom");

  sliderBoxes4.forEach((item, index) => {
    item.classList.add("details-visible");
  });

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

  const handleClickButtonCheckWeather = (e, indexBtn) => {
    buttonsButtom.forEach((item) => {
      item.classList.remove("active-btn-bottom");
    });

    const btn = e.target;
    btn.classList.add("active-btn-bottom");

    innerBoxFour.style.transform = `translateX(-${indexBtn}00%)`;

    detailsWeather.forEach((item, index) => {
      sliderBoxes3Mobile.forEach((item, index) => {
        item.classList.remove("details-visible");
      });

      sliderBoxesDays4.forEach((item, index) => {
        item.classList.remove("details-visible");
      });

      sliderBoxes4.forEach((item, index) => {
        item.classList.remove("details-visible");
      });

      switch (indexBtn) {
        case 0:
          sliderBoxes4.forEach((item, index) => {
            item.classList.add("details-visible");
          });
          break;
        case 1:
          sliderBoxesDays4.forEach((item, index) => {
            item.classList.add("details-visible");
          });
          break;
        case 2:
          sliderBoxes3Mobile.forEach((item, index) => {
            item.classList.add("details-visible");
          });
          break;
        default:
          break;
      }

      if (index === indexBtn) {
        detailsTitle.textContent = btn.innerHTML;
      }
    });
  };

  buttonsButtom.forEach((item, index) => {
    item.addEventListener("click", (e) =>
      handleClickButtonCheckWeather(e, index)
    );
  });

  const CheckSizeWindow = () => {
    if (window.innerWidth >= 768) {
      buttonsButtom.forEach((item) => {
        item.classList.remove("active-btn-bottom");
      });

      sliderBoxes3Mobile.forEach((item, index) => {
        item.classList.remove("details-visible");
      });

      sliderBoxesDays4.forEach((item, index) => {
        item.classList.remove("details-visible");
      });

      sliderBoxes4.forEach((item, index) => {
        item.classList.add("details-visible");
      });

      innerBoxFour.style.transform = `translateX(0%)`;
      firstButtonCheckWeatherDetails.classList.add("active-btn-bottom");
      detailsTitle.textContent = "Details";
    }
  };

  window.addEventListener("resize", CheckSizeWindow);
};

window.addEventListener("DOMContentLoaded", handleContentLoaded);
