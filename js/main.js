const appWrapper = document.querySelector(".app-wrapper");
const sliderContent = document.querySelector(".slider__content");
const slides = document.querySelectorAll(".slider__image-wrapper");
const dotsWrapper = document.querySelector(".slider__dots-inner-wrapper");
const dots = document.querySelectorAll(".slider__dot");
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

const widthDiv = 100;
let counter = 1;
let initialX;
let initialY;

const handleContentLoaded = () => {
  appWrapper.style.width = 1000 + "px";

  const sizeSliderDefaultAndResizeLess1000 = () => {
    let diff2 = (1000 * 100) / window.innerWidth - (1000 * 100) / 1000;
    let widthPx = (window.innerWidth / 100) * 100 - diff2;
    appWrapper.style.width = widthPx + "px";
  };

  if (window.innerWidth < 1000 && window.innerWidth > 767) {
    sizeSliderDefaultAndResizeLess1000();
  } else if (window.innerWidth <= 767) {
    appWrapper.removeAttribute("style");
  }

  //   --------------------------------------------

  setTimeout(() => {
    const firstSlide = sliderContent.children[0].cloneNode(true);
    const lastSlide =
      sliderContent.children[sliderContent.children.length - 1].cloneNode(true);
    sliderContent.insertBefore(lastSlide, sliderContent.children[0]);
    sliderContent.append(firstSlide);
    sliderContent.style.transitionDuration = "0s";
    sliderContent.style.transform = `translateX(-${100}%)`;
  }, 300);

  const firstButtonCheckWeatherDetails = buttonsButtom[0];
  firstButtonCheckWeatherDetails.classList.add("active-btn-bottom");

  sliderBoxes4.forEach((item, index) => {
    item.classList.add("details-visible");
  });

  //   ----------------------------------------------------

  const events = {
    swipeUp: new Event("swipeUp"),
    swipeDown: new Event("swipeDown"),
    swipeLeft: new Event("swipeLeft"),
    swipeRight: new Event("swipeRight"),
  };

  // tu beda slides pobrane z api bedee dodawal do tablicy

  const weatherSlides = [{}];

  weatherSlides.forEach((item) => {
    const elementDot = document.createElement("span");
    elementDot.className = "slider__dot";
    dotsWrapper.appendChild(elementDot);
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
    e.preventDefault();
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

    item.addEventListener("touchstart", (e) =>
      handleClickButtonCheckWeather(e, index)
    );
  });

  const CheckSizeWindow = () => {
    console.log(window.innerWidth);
    appWrapper.style.width = 1000 + "px";
    appWrapper.style.height = 600 + "px";

    let sizePrecent = (1000 * 100) / window.innerWidth;

    appWrapper.style.width = sizePrecent + "%";

    if (window.innerWidth < 1000 && window.innerWidth > 767) {
      sizeSliderDefaultAndResizeLess1000();
    } else if (window.innerWidth <= 767) {
      appWrapper.removeAttribute("style");
    }

    // -----------------------------------------

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

  //   Logika slidera

  const startTouchDisplay = (e) => {
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    initialX = touchX;
    initialY = touchY;
  };

  const moveTouchDisplay = (e) => {
    if (!initialX || !initialY) {
      return;
    }

    const currenTouchX = e.touches[0].clientX;
    const currenTouchY = e.touches[0].clientY;

    const diffrenceX = initialX - currenTouchX;
    const diffrenceY = initialY - currenTouchY;

    if (Math.abs(diffrenceX) > Math.abs(diffrenceY)) {
      if (diffrenceX > 0) {
        sliderContent.dispatchEvent(events.swipeLeft);
      } else {
        sliderContent.dispatchEvent(events.swipeRight);
      }
    } else {
      if (diffrenceY > 0) {
        sliderContent.dispatchEvent(events.swipeUp);
      } else {
        sliderContent.dispatchEvent(events.swipeDown);
      }
    }

    initialX = null;
    initialY = null;
  };

  sliderContent.addEventListener("touchstart", startTouchDisplay);
  sliderContent.addEventListener("touchmove", moveTouchDisplay);

  const update = () => {
    sliderContent.style.transform = "translateX(" + -widthDiv * counter + "%)";
  };

  const slideTransition = () => {
    sliderContent.style.transition = "transform 0.6s ease-in-out";
    update();
  };

  const moveLeft = (e) => {
    console.log("left swipe", counter > weatherSlides.length - 1);
    if (counter > weatherSlides.length - 1) return;
    counter++;
    slideTransition();
  };

  const moveRight = (e) => {
    console.log("right swipe", counter);
    if (counter <= 0) return;
    counter--;
    slideTransition();
  };

  sliderContent.addEventListener("swipeLeft", moveLeft);
  sliderContent.addEventListener("swipeRight", moveRight);

  const handleClickDot = (index) => {
    sliderContent.style.transitionDuration = "0.6s";
    sliderContent.style.transform = `translateX(-${index}00%)`;
  };

  dots.forEach((item, index) => {
    item.addEventListener("click", () => handleClickDot(index));
  });
};

window.addEventListener("DOMContentLoaded", handleContentLoaded);
