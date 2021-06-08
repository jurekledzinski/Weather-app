// -----------

let weathersArray = [];
const widthDiv = 100;
let counter = 1;
let initialX;
let initialY;
let inputMsg = "";

const handleContentLoaded = () => {
  const buttonAdd = document.querySelector(".search-bar__button-add");
  const buttonRemove = document.querySelector(".search-bar__button-remove");

  const form = document.querySelector(".form");

  // ---------
  const msgAlert = document.querySelector(".input-message");
  const appWrapper = document.querySelector(".app-wrapper");
  const sliderContent = document.querySelector(".slider__content");
  //   --------
  //   const slides = document.querySelectorAll(".slider__image-wrapper");
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

  console.log(buttonsButtom, " buttons bottom ale gdy mamy w localstorage");
  console.log(dots, " dots ale gdy mamy w localstorag");

  //   ------------------------------------------------

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

  //   setTimeout(() => {
  //     if (sliderContent.children[0]) {
  //       const firstSlide = sliderContent.children[0].cloneNode(true);
  //       const lastSlide =
  //         sliderContent.children[sliderContent.children.length - 1].cloneNode(
  //           true
  //         );
  //       sliderContent.insertBefore(lastSlide, sliderContent.children[0]);
  //       sliderContent.append(firstSlide);
  //       sliderContent.style.transitionDuration = "0s";
  //       sliderContent.style.transform = `translateX(-${100}%)`;
  //     }
  //   }, 300);

  //   -- t ponizej dziala

  const firstButtonCheckWeatherDetails = buttonsButtom[0];
  firstButtonCheckWeatherDetails?.classList.add("active-btn-bottom");

  //   -- dotad

  //   -- t ponizej dziala

  sliderBoxes4.forEach((item, index) => {
    item.classList.add("details-visible");
  });

  //   -- dotad

  //   ----------------------------------------------------

  const events = {
    swipeUp: new Event("swipeUp"),
    swipeDown: new Event("swipeDown"),
    swipeLeft: new Event("swipeLeft"),
    swipeRight: new Event("swipeRight"),
  };

  // tu beda slides pobrane z api bedee dodawal do tablicy

  const weatherSlides = [{}];
  dotsWrapper.innerHTML = "";
  weathersArray.forEach((item) => {
    const elementDot = document.createElement("span");
    elementDot.className = "slider__dot";
    dotsWrapper.appendChild(elementDot);
  });

  //   const labels = ["2 p.m.", "3 p.m.", "4 p.m.", "5 p.m.", "6 p.m.", "7 p.m."];

  //   const data = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: "Temperature",
  //         backgroundColor: "rgb(255, 99, 0)",
  //         borderColor: "rgb(255, 99, 132)",
  //         data: [0, 10, 5, 2, 20, 30],
  //         cubicInterpolationMode: "monotone",
  //       },
  //     ],
  //   };

  //   const config = {
  //     type: "line",
  //     data,
  //     options: {
  //       maintainAspectRatio: false,
  //       plugins: {
  //         legend: {
  //           display: true,
  //           labels: {
  //             color: "rgb(95,95,95)",
  //           },
  //         },
  //       },
  //     },
  //   };

  //   var myChart = new Chart(document.getElementById("myChart"), config);

  //   console.log(myChart);

  const handleSearchWeather = (e) => {
    e.preventDefault();
    let cityInputValue = e.target[0].value.toLowerCase();
    let countryInputValue = e.target[1].value.toLowerCase();

    console.log(cityInputValue, countryInputValue);

    if (cityInputValue === "" || countryInputValue === "") {
      msgAlert.innerHTML = "Please fill in all fields";
      setTimeout(() => (msgAlert.innerHTML = ""), 2000);
      return;
    }

    if (countryInputValue.length < 4) {
      msgAlert.innerHTML = "Country name is too short";
      setTimeout(() => (msgAlert.innerHTML = ""), 2000);
      return;
    }

    fetch("http://localhost:5000", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ cityInputValue, countryInputValue }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Can't find location");
      })
      .then((result) => {
        weathersArray = [...weathersArray, result];

        const slide = document.createElement("div");
        slide.className = "slider__image-wrapper";
        slide.innerHTML = `
        <div class="slider__inner-box">
          <p class="slider__current-date">Mon, 21 May 2021</p>
          <div class="slider__image-temp-icon">
            <div class="slider__image-temp-icon-left">
              <p class="slider__temperature">
                24
                <span class="slider__celsius-icon"
                  ><i class="wi wi-degrees"></i>c</span
                >
              </p>
            </div>
            <div class="slider__image-temp-icon-right">
              <span class="slider__weather-icon"
                ><i class="wi wi-day-sunny"></i>
              </span>
              <p class="slider__image-description">Sunny</p>
            </div>
          </div>
          <p class="slider__city">Sittard, Netherlands</p>
        </div>
        <div class="slider__inner-box">
          <h3 class="slider__box-2-title">Hourly temperature</h3>
          <div class="slider__box-2-boxes">
           
          </div>
        </div>
        <div class="slider__inner-box">
          <h3 class="slider__box-3-title">Hourly weather</h3>
          <div class="slider__box-3-boxes">
            <div class="slider__box-3">
              <p class="slider__hourly-weather-time">2 p.m.</p>
              <div class="slider__box-3-wrapper">
                <div class="slider__box-3-left">
                  <p class="slider__hourly-weather-temperature-wrapper">
                    25
                    <span class="slider__hourly-icon-celsius"
                      ><i class="wi wi-degrees"></i>c</span
                    >
                  </p>
                </div>
                <div class="slider__box-3-right">
                  <span class="slider__hourly-icon-weather"
                    ><i class="wi wi-day-sunny"></i
                  ></span>
                </div>
              </div>
              <p class="slider__hourly-weather-description">Sunny</p>
            </div>
            <div class="slider__box-3">
              <p class="slider__hourly-weather-time">3 p.m.</p>
              <div class="slider__box-3-wrapper">
                <div class="slider__box-3-left">
                  <p class="slider__hourly-weather-temperature-wrapper">
                    25
                    <span class="slider__hourly-icon-celsius"
                      ><i class="wi wi-degrees"></i>c</span
                    >
                  </p>
                </div>
                <div class="slider__box-3-right">
                  <span class="slider__hourly-icon-weather"
                    ><i class="wi wi-day-cloudy"></i
                  ></span>
                </div>
              </div>
              <p class="slider__hourly-weather-description">Sunny</p>
            </div>
            <div class="slider__box-3">
              <p class="slider__hourly-weather-time">4 p.m.</p>
              <div class="slider__box-3-wrapper">
                <div class="slider__box-3-left">
                  <p class="slider__hourly-weather-temperature-wrapper">
                    25
                    <span class="slider__hourly-icon-celsius"
                      ><i class="wi wi-degrees"></i>c</span
                    >
                  </p>
                </div>
                <div class="slider__box-3-right">
                  <span class="slider__hourly-icon-weather"
                    ><i class="wi wi-day-rain"></i
                  ></span>
                </div>
              </div>
              <p class="slider__hourly-weather-description">Sunny</p>
            </div>
            <div class="slider__box-3">
              <p class="slider__hourly-weather-time">5 p.m.</p>
              <div class="slider__box-3-wrapper">
                <div class="slider__box-3-left">
                  <p class="slider__hourly-weather-temperature-wrapper">
                    25
                    <span class="slider__hourly-icon-celsius"
                      ><i class="wi wi-degrees"></i>c</span
                    >
                  </p>
                </div>
                <div class="slider__box-3-right">
                  <span class="slider__hourly-icon-weather"
                    ><i class="wi wi-day-sunny"></i
                  ></span>
                </div>
              </div>
              <p class="slider__hourly-weather-description">Sunny</p>
            </div>
          </div>
        </div>
        <div class="slider__inner-box">
          <h3 class="slider__box-4-title">Details</h3>
          <div class="slider__inner-box-4 slider__inner-box-4-panel-${result.city}">
            <div class="slider__box-4-boxes">
              <div class="slider__box-4 slider__box-4-${result.city}">
                <span class="slider__box-details-icon">
                  <i class="wi wi-thermometer"></i>
                </span>
                <div class="slider__box-4-part2">
                  <div class="slider__box-4-part3">
                    <p class="slider__box-details-text">
                      23
                      <span class="slider__box-details-text-icon">
                        <i class="wi wi-degrees"></i>c
                      </span>
                    </p>
                  </div>
                  <div class="slider__box-4-part4">
                    <p class="slider__box-details-description">
                      Feels like
                    </p>
                  </div>
                </div>
              </div>
              <div class="slider__box-4 slider__box-4-${result.city}">
                <span class="slider__box-details-icon">
                  <i class="wi wi-raindrops"></i>
                </span>
                <div class="slider__box-4-part2">
                  <div class="slider__box-4-part3">
                    <p class="slider__box-details-text">28%</p>
                  </div>
                  <div class="slider__box-4-part4">
                    <p class="slider__box-details-description">
                      Humidity
                    </p>
                  </div>
                </div>
              </div>
              <div class="slider__box-4 slider__box-4-${result.city}">
                <span class="slider__box-details-icon">
                  <i class="wi wi-strong-wind"></i>
                </span>
                <div class="slider__box-4-part2">
                  <div class="slider__box-4-part3">
                    <p class="slider__box-details-text">4/km</p>
                  </div>
                  <div class="slider__box-4-part4">
                    <p class="slider__box-details-description">Wind</p>
                  </div>
                </div>
              </div>
              <div class="slider__box-4 slider__box-4-${result.city}">
                <span class="slider__box-details-icon">
                  <i class="wi wi-barometer"></i>
                </span>
                <div class="slider__box-4-part2">
                  <div class="slider__box-4-part3">
                    <p class="slider__box-details-text">1024</p>
                  </div>
                  <div class="slider__box-4-part4">
                    <p class="slider__box-details-description">
                      Pressure
                    </p>
                  </div>
                </div>
              </div>
              <div class="slider__box-4 slider__box-4-${result.city}">
                <span class="slider__box-details-icon">
                  <i class="wi wi-thermometer"></i>
                </span>
                <div class="slider__box-4-part2">
                  <div class="slider__box-4-part3">
                    <p class="slider__box-details-text">100</p>
                  </div>
                  <div class="slider__box-4-part4">
                    <p class="slider__box-details-description">
                      Dev point
                    </p>
                  </div>
                </div>
              </div>
              <div class="slider__box-4 slider__box-4-${result.city}">
                <span class="slider__box-details-icon">
                  <i class="fas fa-eye"></i>
                </span>
                <div class="slider__box-4-part2">
                  <div class="slider__box-4-part3">
                    <p class="slider__box-details-text">2/km</p>
                  </div>
                  <div class="slider__box-4-part4">
                    <p class="slider__box-details-description">
                      Visibility
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="slider__box-4-boxes--days-forecast">
              <div class="slider__box-4-days slider__box-4-days-${result.city}">
                <div class="slider__box-4-days-left">
                  <p class="slider__box-4-days-day">Mon</p>
                  <p class="slider__box-4-days-details-text">
                    23
                    <span class="slider__box-4-days-details-text-icon">
                      <i class="wi wi-degrees"></i>c
                    </span>
                  </p>
                </div>
                <div class="slider__box-4-days-right">
                  <span class="slider__box-4-days-icon-weather"
                    ><i class="wi wi-day-sunny"></i
                  ></span>
                </div>
              </div>
              <div class="slider__box-4-days slider__box-4-days-${result.city}">
                <div class="slider__box-4-days-left">
                  <p class="slider__box-4-days-day">Thu</p>
                  <p class="slider__box-4-days-details-text">
                    26
                    <span class="slider__box-4-days-details-text-icon">
                      <i class="wi wi-degrees"></i>c
                    </span>
                  </p>
                </div>
                <div class="slider__box-4-days-right">
                  <span class="slider__box-4-days-icon-weather"
                    ><i class="wi wi-day-sunny"></i
                  ></span>
                </div>
              </div>
              <div class="slider__box-4-days slider__box-4-days-${result.city}">
                <div class="slider__box-4-days-left">
                  <p class="slider__box-4-days-day">Wed</p>
                  <p class="slider__box-4-days-details-text">
                    28
                    <span class="slider__box-4-days-details-text-icon">
                      <i class="wi wi-degrees"></i>c
                    </span>
                  </p>
                </div>
                <div class="slider__box-4-days-right">
                  <span class="slider__box-4-days-icon-weather"
                    ><i class="wi wi-day-sunny"></i
                  ></span>
                </div>
              </div>
              <div class="slider__box-4-days slider__box-4-days-${result.city}">
                <div class="slider__box-4-days-left">
                  <p class="slider__box-4-days-day">Thu</p>
                  <p class="slider__box-4-days-details-text">
                    26
                    <span class="slider__box-4-days-details-text-icon">
                      <i class="wi wi-degrees"></i>c
                    </span>
                  </p>
                </div>
                <div class="slider__box-4-days-right">
                  <span class="slider__box-4-days-icon-weather"
                    ><i class="wi wi-day-sunny"></i
                  ></span>
                </div>
              </div>
              <div class="slider__box-4-days slider__box-4-days-${result.city}">
                <div class="slider__box-4-days-left">
                  <p class="slider__box-4-days-day">Fri</p>
                  <p class="slider__box-4-days-details-text">
                    30
                    <span class="slider__box-4-days-details-text-icon">
                      <i class="wi wi-degrees"></i>c
                    </span>
                  </p>
                </div>
                <div class="slider__box-4-days-right">
                  <span class="slider__box-4-days-icon-weather"
                    ><i class="wi wi-day-sunny"></i
                  ></span>
                </div>
              </div>
              <div class="slider__box-4-days slider__box-4-days-${result.city}">
                <div class="slider__box-4-days-left">
                  <p class="slider__box-4-days-day">Sat</p>
                  <p class="slider__box-4-days-details-text">
                    34
                    <span class="slider__box-4-days-details-text-icon">
                      <i class="wi wi-degrees"></i>c
                    </span>
                  </p>
                </div>
                <div class="slider__box-4-days-right">
                  <span class="slider__box-4-days-icon-weather"
                    ><i class="wi wi-day-sunny"></i
                  ></span>
                </div>
              </div>
            </div>

            <div class="slider__box-4-boxes--hourly-weather">
              <div class="slider__box-3-mobile slider__box-3-mobile-${result.city}">
                <p class="slider__hourly-time-mobile">3 p.m.</p>
                <div class="slider__box-3-wrapper-mobile">
                  <div class="slider__box-3-left-mobile">
                    <p class="slider__hourly-temperature-mobile">
                      25
                      <span class="slider__hourly-icon-mobile"
                        ><i class="wi wi-degrees"></i>c</span
                      >
                    </p>
                  </div>
                  <div class="slider__box-3-right-mobile">
                    <span class="slider__hourly-icon-weather-mobile"
                      ><i class="wi wi-day-cloudy"></i
                    ></span>
                  </div>
                </div>
                <p class="slider__hourly-weather-description-mobile">
                  Sunny
                </p>
              </div>
              <div class="slider__box-3-mobile slider__box-3-mobile-${result.city}">
                <p class="slider__hourly-time-mobile">3 p.m.</p>
                <div class="slider__box-3-wrapper-mobile">
                  <div class="slider__box-3-left-mobile">
                    <p class="slider__hourly-temperature-mobile">
                      25
                      <span class="slider__hourly-icon-mobile"
                        ><i class="wi wi-degrees"></i>c</span
                      >
                    </p>
                  </div>
                  <div class="slider__box-3-right-mobile">
                    <span class="slider__hourly-icon-weather-mobile"
                      ><i class="wi wi-day-cloudy"></i
                    ></span>
                  </div>
                </div>
                <p class="slider__hourly-weather-description-mobile">
                  Sunny
                </p>
              </div>
              <div class="slider__box-3-mobile slider__box-3-mobile-${result.city}">
                <p class="slider__hourly-time-mobile">3 p.m.</p>
                <div class="slider__box-3-wrapper-mobile">
                  <div class="slider__box-3-left-mobile">
                    <p class="slider__hourly-temperature-mobile">
                      25
                      <span class="slider__hourly-icon-mobile"
                        ><i class="wi wi-degrees"></i>c</span
                      >
                    </p>
                  </div>
                  <div class="slider__box-3-right-mobile">
                    <span class="slider__hourly-icon-weather-mobile"
                      ><i class="wi wi-day-cloudy"></i
                    ></span>
                  </div>
                </div>
                <p class="slider__hourly-weather-description-mobile">
                  Sunny
                </p>
              </div>
              <div class="slider__box-3-mobile slider__box-3-mobile-${result.city}">
                <p class="slider__hourly-time-mobile">3 p.m.</p>
                <div class="slider__box-3-wrapper-mobile">
                  <div class="slider__box-3-left-mobile">
                    <p class="slider__hourly-temperature-mobile">
                      25
                      <span class="slider__hourly-icon-mobile"
                        ><i class="wi wi-degrees"></i>c</span
                      >
                    </p>
                  </div>
                  <div class="slider__box-3-right-mobile">
                    <span class="slider__hourly-icon-weather-mobile"
                      ><i class="wi wi-day-cloudy"></i
                    ></span>
                  </div>
                </div>
                <p class="slider__hourly-weather-description-mobile">
                  Sunny
                </p>
              </div>
              <div class="slider__box-3-mobile slider__box-3-mobile-${result.city}">
                <p class="slider__hourly-time-mobile">3 p.m.</p>
                <div class="slider__box-3-wrapper-mobile">
                  <div class="slider__box-3-left-mobile">
                    <p class="slider__hourly-temperature-mobile">
                      25
                      <span class="slider__hourly-icon-mobile"
                        ><i class="wi wi-degrees"></i>c</span
                      >
                    </p>
                  </div>
                  <div class="slider__box-3-right-mobile">
                    <span class="slider__hourly-icon-weather-mobile"
                      ><i class="wi wi-day-cloudy"></i
                    ></span>
                  </div>
                </div>
                <p class="slider__hourly-weather-description-mobile">
                  Sunny
                </p>
              </div>
              <div class="slider__box-3-mobile slider__box-3-mobile-${result.city}">
                <p class="slider__hourly-time-mobile">3 p.m.</p>
                <div class="slider__box-3-wrapper-mobile">
                  <div class="slider__box-3-left-mobile">
                    <p class="slider__hourly-temperature-mobile">
                      25
                      <span class="slider__hourly-icon-mobile"
                        ><i class="wi wi-degrees"></i>c</span
                      >
                    </p>
                  </div>
                  <div class="slider__box-3-right-mobile">
                    <span class="slider__hourly-icon-weather-mobile"
                      ><i class="wi wi-day-cloudy"></i
                    ></span>
                  </div>
                </div>
                <p class="slider__hourly-weather-description-mobile">
                  Sunny
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="slider__bottom-panel slider__bottom-panel-${result.city}">
          <button class="slider__bottom-btn slider__bottom-btn-${result.city}">Details</button
          ><button class="slider__bottom-btn slider__bottom-btn-${result.city}">6 days forecast</button
          ><button class="slider__bottom-btn slider__bottom-btn-${result.city}">Hourly forecast</button>
        </div>`;

        sliderContent.appendChild(slide);

        // weathersArray.map((item) => {
        //   sliderContent.appendChild(slide);
        // });

        const sliderBox2Boxes = document.querySelector(".slider__box-2-boxes");
        sliderBox2Boxes.className = `slider__box-2-boxes-${result.city}`;
        sliderBox2Boxes.style.position = "relative";
        sliderBox2Boxes.style.margin = "auto";
        sliderBox2Boxes.style.height = 80 + "%";
        sliderBox2Boxes.style.width = 99 + "%";

        const elementCanvas = document.createElement("canvas");
        elementCanvas.className = `myChart-${result.city}`;
        sliderBox2Boxes.appendChild(elementCanvas);

        const labels = [
          "2 p.m.",
          "3 p.m.",
          "4 p.m.",
          "5 p.m.",
          "6 p.m.",
          "7 p.m.",
        ];

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

        var myChart = new Chart(
          document.querySelector(`.myChart-${result.city}`),
          config
        );

        const dotsWrapper = document.querySelector(
          ".slider__dots-inner-wrapper"
        );

        const sliderBoxes3 = document.querySelectorAll(".slider__box-3");
        const sliderBoxes3Mobile = document.querySelectorAll(
          `.slider__box-3-mobile-${result.city}`
        );

        const sliderBoxes4 = document.querySelectorAll(
          `.slider__box-4-${result.city}`
        );

        const sliderBoxesDays4 = document.querySelectorAll(
          `.slider__box-4-days-${result.city}`
        );
        const detailsTitle = document.querySelector(".slider__box-4-title");

        // detailsTitle.className = `slider__box-4-title-active`;
        // detailsTitle.className = `slider__box-4-title-${result.city}`;

        // ------------
        const detailsWeather = document.querySelectorAll(
          ".slider__box-4-boxes,.slider__box-4-boxes--days-forecast,.slider__box-4-boxes--hourly-weather"
        );
        const innerBoxFour = document.querySelector(
          `.slider__inner-box-4-panel-${result.city}`
        );

        const panelButtonsDown = document.querySelector(
          `slider__bottom-panel-${result.city}`
        );

        const buttonsButtom = document.querySelectorAll(
          `.slider__bottom-btn-${result.city}`
        );

        dotsWrapper.innerHTML = "";
        weathersArray.forEach((item) => {
          const elementDot = document.createElement("span");
          elementDot.className = "slider__dot";
          dotsWrapper.appendChild(elementDot);
        });

        const dots = document.querySelectorAll(".slider__dot");

        dots.forEach((item, index) => {
          item.addEventListener("click", () => handleClickDot(index));
        });

        const firstButtonCheckWeatherDetails = buttonsButtom[0];
        firstButtonCheckWeatherDetails?.classList.add("active-btn-bottom");

        sliderBoxes4.forEach((item, index) => {
          item.classList.add("details-visible");
        });

        const handleClickButtonCheckWeather = (e, indexBtn) => {
          e.preventDefault();
          e.stopPropagation();

          if (detailsWeather.length > 0) {
            buttonsButtom.forEach((item) => {
              item.classList.remove("active-btn-bottom");
              item.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              item.style.fontWeight = 300;
            });

            const btn = e.target;
            btn.classList.add("active-btn-bottom");
            btn.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
            btn.style.fontWeight = 400;

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
                // detailsTitle.textContent = btn.innerHTML;
                e.path[2].children[3].children[0].innerHTML = btn.innerHTML;
              }
            });
          }
        };

        buttonsButtom.forEach((item, index) => {
          item.addEventListener("click", (e) =>
            handleClickButtonCheckWeather(e, index)
          );

          item.addEventListener("touchstart", (e) =>
            handleClickButtonCheckWeather(e, index)
          );
        });

        e.target[0].value = "";
        e.target[1].value = "";
      })
      .catch((err) => {
        msgAlert.innerHTML = err.message;
        // setTimeout(() => (msgAlert.innerHTML = ""), 2000);
      });
  };

  form.addEventListener("submit", handleSearchWeather);

  const handleAddWeatherSlide = () => {
    console.log("Dodaje slide");
    console.log(weathersArray, "weathersArray w dodaje slide");
  };

  buttonAdd.addEventListener("click", handleAddWeatherSlide);

  const handleRemoveWeatherSlide = (e) => {
    console.log(e.path[3].childNodes[7].firstElementChild.children);
    console.log(
      e.path[3].childNodes[7].firstElementChild.attributes[1].nodeValue
    );
    const elementStyle =
      e.path[3].childNodes[7].firstElementChild.attributes[1].nodeValue;
    const partElementStyle = elementStyle.slice(elementStyle.lastIndexOf("("));
    let indexSlide;
    if (partElementStyle.indexOf("-") !== -1) {
      indexSlide = partElementStyle.slice(2, 3);
      console.log(indexSlide, "index gdy jest minus");
    } else {
      indexSlide = partElementStyle.slice(1, 2);
      console.log(indexSlide, "index gdy nie ma minus");
    }

    console.log(indexSlide, " index slide");
    console.log(partElementStyle);

    console.log("Usuwam slide");
    console.log(weathersArray, "weathersArray w remove slide");
  };

  buttonRemove.addEventListener("click", handleRemoveWeatherSlide);

  // --- to ponizej dziala

  const handleClickButtonCheckWeather = (e, indexBtn) => {
    console.log(
      detailsWeather,
      " detailsWeather w check details gdy w localStorage"
    );
    console.log(
      buttonsButtom,
      " buttonsButtom w check details gdy w localStorage"
    );
    console.log(
      innerBoxFour,
      " innerBoxFour w check details gdy w localStorage"
    );
    console.log(
      sliderBoxes3Mobile,
      " sliderBoxes3Mobile w check details gdy w localStorage"
    );
    console.log(
      sliderBoxesDays4,
      " sliderBoxesDays4 w check details gdy w localStorage"
    );
    console.log(
      sliderBoxes4,
      " sliderBoxes4 w check details gdy w localStorage"
    );
    console.log(
      detailsTitle,
      " detailsTitle w check details gdy w localStorage"
    );

    e.preventDefault();
    e.stopPropagation();
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

  //   -- to powyżej dziala

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

  //   ----- to poniżej dziala ok

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

  //   ---to jest ok ponizej

  const handleClickDot = (index) => {
    sliderContent.style.transitionDuration = "0.6s";
    sliderContent.style.transform = `translateX(-${index}00%)`;
  };

  dots.forEach((item, index) => {
    item.addEventListener("click", () => handleClickDot(index));
  });
};

window.addEventListener("DOMContentLoaded", handleContentLoaded);
