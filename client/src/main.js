import { utcToZonedTime, format } from "date-fns-tz";

let weathersArray = [];
const widthDiv = 100;
let counter = 1;
let initialX;
let initialY;
let num = 0;
let indexWeather = 0;

const handleContentLoaded = () => {
  const buttonRemove = document.querySelector(".search-bar__button-remove");
  const form = document.querySelector(".form");
  // ---------
  const msgAlert = document.querySelector(".input-message");
  const appWrapper = document.querySelector(".app-wrapper");
  const sliderContent = document.querySelector(".slider__content");
  const dotsWrapper = document.querySelector(".slider__dots-inner-wrapper");

  const getElementsApp = (result) => {
    const dotsWrapper = document.querySelector(".slider__dots-inner-wrapper");
    const sliderBoxes3Mobile = document.querySelectorAll(
      `.slider__box-3-mobile-${result.city.replace(/\s/g, "-")}`
    );
    const sliderBoxes4 = document.querySelectorAll(
      `.slider__box-4-${result.city.replace(/\s/g, "-")}`
    );
    const sliderBoxesDays4 = document.querySelectorAll(
      `.slider__box-4-days-${result.city.replace(/\s/g, "-")}`
    );
    const detailsTitle = document.querySelector(".slider__box-4-title");
    const detailsWeather = document.querySelectorAll(
      ".slider__box-4-boxes,.slider__box-4-boxes--days-forecast,.slider__box-4-boxes--hourly-weather"
    );
    const innerBoxFour = document.querySelector(
      `.slider__inner-box-4-panel-${result.city.replace(/\s/g, "-")}`
    );
    const buttonsButtom = document.querySelectorAll(
      `.slider__bottom-btn-${result.city.replace(/\s/g, "-")}`
    );

    return {
      dotsWrapper,
      sliderBoxes3Mobile,
      sliderBoxes4,
      sliderBoxesDays4,
      detailsTitle,
      detailsWeather,
      innerBoxFour,
      buttonsButtom,
    };
  };

  appWrapper.style.width = 1000 + "px";

  const localStorageWeather = JSON.parse(
    localStorage.getItem("weather") || "[]"
  );

  const getCurrentDate = (timezone) => {
    const utcDate = utcToZonedTime(new Date(), timezone);
    const timeInCountry = format(utcDate, "yyyy-MM-dd HH:mm:ssXXX");
    let currentDate = new Date(timeInCountry).toDateString();

    const day = new Date(timeInCountry).getDate();
    let dateCurrent = currentDate.substr(0, 3) + "," + currentDate.substr(3);
    let indexComma = dateCurrent.indexOf(",");
    const nameMonth = dateCurrent.slice(indexComma + 2, 8);
    const dayNumber = dateCurrent.slice(indexComma + 6, 11);
    let part1 = dateCurrent.slice(0, 8);
    let part2 = dateCurrent.slice(-8);
    let partchanged1 = part1.replace(nameMonth, dayNumber);
    let partChanged2 = part2.replace(dayNumber, nameMonth);
    let todayDate = partchanged1.replace(dayNumber, day) + partChanged2;

    return todayDate;
  };

  const getChartData = (result, timezone) => {
    const tempHourly = result.hourly.map((item) => item.temp);
    const labelHourly = result.hourly.map((item) => {
      const dateTimeUtc = utcToZonedTime(new Date(item.data * 1000), timezone);
      const timeInCountry = format(dateTimeUtc, "yyyy-MM-dd HH:mm:ssXXX");
      let hours = new Date(timeInCountry).getHours();
      const period = hours >= 12 ? " p.m." : " a.m.";
      hours = hours % 12;
      hours = hours ? hours : 12;
      let timeHourly = hours + period;
      return timeHourly;
    });

    const data = {
      labels: labelHourly,
      datasets: [
        {
          label: "Temperature",
          backgroundColor: "rgb(255, 99, 0)",
          borderColor: "rgb(255, 99, 132)",
          data: tempHourly,
          cubicInterpolationMode: "monotone",
          borderWidth: 0.7,
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
            position: "top",
            align: "end",
            labels: {
              color: "rgb(95,95,95)",
            },
          },
        },
      },
    };

    return config;
  };

  let clock = (result, timezone) => {
    const dateUtc = utcToZonedTime(new Date(), timezone);
    const countryTime = format(dateUtc, "yyyy-MM-dd HH:mm:ssXXX");
    let date = new Date(countryTime);
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let period = "AM";
    if (hour == 0) {
      hour = 0;
    } else if (hour == 12) {
      hour = 12;
      period = "PM";
    } else if (hour > 12) {
      period = "PM";
    }

    minute = minute < 10 ? `0${minute}` : minute;
    second = second < 10 ? `0${second}` : second;
    let time = `${hour}:${minute}:${second}:${period}`;

    if (
      document.querySelector(
        `.slider__country-time-${result.city.replace(/\s/g, "-")}`
      )
    ) {
      document.querySelector(
        `.slider__country-time-${result.city.replace(/\s/g, "-")}`
      ).innerHTML = time;
    }

    return time;
  };

  const createDots = (dataWeather) => {
    dataWeather.forEach((item) => {
      const elementDot = document.createElement("span");
      elementDot.className = "slider__dot";
      dotsWrapper.appendChild(elementDot);
    });
    const dots = document.querySelectorAll(".slider__dot");

    dots.forEach((item, index) => {
      item.addEventListener("click", () => handleClickDot(index));
    });
  };

  const defaultVisiblityDetailsButton = (buttonsButtom, sliderBoxes4) => {
    const firstButtonCheckWeatherDetails = buttonsButtom[0];
    firstButtonCheckWeatherDetails?.classList.add("active-btn-bottom");

    sliderBoxes4.forEach((item, index) => {
      item.classList.add("details-visible");
    });
  };

  const handleClickButtonCheckWeather = (
    e,
    indexBtn,
    detailsWeather,
    buttonsButtom,
    innerBoxFour,
    sliderBoxes3Mobile,
    sliderBoxesDays4,
    sliderBoxes4
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (detailsWeather.length > 0) {
      buttonsButtom.forEach((item) => {
        item.classList.remove("active-btn-bottom");
        item.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        item.style.fontWeight = 300;
      });

      const btn = e.target;
      btn.classList.add("active-btn-bottom");
      btn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
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
          e.path[2].children[3].children[0].innerHTML = btn.innerHTML;
        }
      });
    }
  };

  const createCopySlides = (result, config) => {
    setTimeout(() => {
      num++;
      if (sliderContent.children[0]) {
        const firstSlide = sliderContent.children[0].cloneNode(true);

        firstSlide.setAttribute("id", "first");
        firstSlide.children[1].children[1].children[0].className = `myChart-${result.city.replace(
          /\s/g,
          "-"
        )}-${num}`;
        const lastSlide =
          sliderContent.children[sliderContent.children.length - 1].cloneNode(
            true
          );

        lastSlide.setAttribute("id", "last");
        sliderContent.insertBefore(lastSlide, sliderContent.children[0]);
        sliderContent.append(firstSlide);
        sliderContent.children[0].children[0].children[1].children[2].children[0].className = `slider__country-time slider__country-time-${result.city.replace(
          /\s/g,
          "-"
        )}-${num}`;

        new Chart(
          document.querySelector(
            `.myChart-${result.city.replace(/\s/g, "-")}-${num}`
          ),
          config
        );

        new Chart(
          document.querySelector(`.myChart-${result.city.replace(/\s/g, "-")}`),
          config
        );

        sliderContent.style.transitionDuration = "0s";
        sliderContent.style.transform = `translateX(-${100}%)`;
      }
    }, 300);
  };

  //   --------------------------------------------------------
  const fetchWeahter = (item) => {
    const localStorageWeather = JSON.parse(
      localStorage.getItem("weather") || "[]"
    );

    if (localStorageWeather.length > 0) {
      let cityInputValue = item.city
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\u0142/g, "l")
        .toLowerCase();
      let countryInputValue = item.country.toLowerCase();

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
          const { city, country, current, timezone } = result;
          const todayDate = getCurrentDate();

          if (sliderContent.children.length > 1) {
            sliderContent.style.transitionDuration = "0s";
            sliderContent.children[0].remove();
            sliderContent.children[sliderContent.children.length - 1].remove();
          }

          const weatherFourHours = result.hourly.slice(0, 4);

          const structureSlide = getStructureSlideWeather(
            result,
            city,
            country,
            current,
            timezone,
            todayDate,
            weatherFourHours
          );

          const slide = document.createElement("div");
          slide.className = "slider__image-wrapper";
          slide.innerHTML = structureSlide;

          sliderContent.appendChild(slide);

          setInterval(() => clock(result, timezone), 1000);

          const sliderBox2Boxes = document.querySelector(
            ".slider__box-2-boxes"
          );
          sliderBox2Boxes.className = `slider__box-2-boxes-${result.city}`;
          sliderBox2Boxes.style.position = "relative";
          sliderBox2Boxes.style.margin = "auto";
          sliderBox2Boxes.style.height = 80 + "%";
          sliderBox2Boxes.style.width = 99 + "%";

          const elementCanvas = document.createElement("canvas");
          elementCanvas.className = `myChart-${result.city.replace(
            /\s/g,
            "-"
          )}`;
          sliderBox2Boxes.appendChild(elementCanvas);

          const config = getChartData(result, timezone);

          new Chart(
            document.querySelector(
              `.myChart-${result.city.replace(/\s/g, "-")}`
            ),
            config
          );

          const {
            dotsWrapper,
            sliderBoxes3Mobile,
            sliderBoxes4,
            sliderBoxesDays4,
            detailsTitle,
            detailsWeather,
            innerBoxFour,
            buttonsButtom,
          } = getElementsApp(result);

          dotsWrapper.innerHTML = "";
          createDots(localStorageWeather);
          defaultVisiblityDetailsButton(buttonsButtom, sliderBoxes4);

          buttonsButtom.forEach((item, index) => {
            item.addEventListener("click", (e) =>
              handleClickButtonCheckWeather(
                e,
                index,
                detailsWeather,
                buttonsButtom,
                innerBoxFour,
                sliderBoxes3Mobile,
                sliderBoxesDays4,
                sliderBoxes4
              )
            );

            item.addEventListener("touchstart", (e) =>
              handleClickButtonCheckWeather(
                e,
                index,
                detailsWeather,
                buttonsButtom,
                innerBoxFour,
                sliderBoxes3Mobile,
                sliderBoxesDays4,
                sliderBoxes4
              )
            );
          });

          createCopySlides(result, config);

          window.addEventListener("resize", () =>
            CheckSizeWindow(
              buttonsButtom,
              sliderBoxes3Mobile,
              sliderBoxesDays4,
              sliderBoxes4,
              innerBoxFour,
              detailsTitle
            )
          );
        })
        .catch((err) => {
          msgAlert.innerHTML = err.message;
          setTimeout(() => (msgAlert.innerHTML = ""), 2000);
        });
    }
  };

  let idInterval = window.setInterval(() => {
    if (indexWeather < localStorageWeather.length) {
      const element = localStorageWeather[indexWeather];
      fetchWeahter(element);
      indexWeather++;
    } else {
      window.clearInterval(idInterval);
    }
  }, 550);

  const getStructureSlideWeather = (
    result,
    city,
    country,
    current,
    timezone,
    todayDate,
    weatherFourHours
  ) => {
    return `
        <div class="slider__inner-box">
            <div class="slider__inner-box-one-left">
                <div class="slider__date-wrapper">
                    <p class="slider__current-date">${todayDate}</p>
                </div>
                <div class="slider__temperature-wrapper">
                    <p class="slider__temperature">
                        ${current.temp.toFixed(1)}
                        <span class="slider__celsius-icon"
                        ><i class="wi wi-degrees"></i>c</span>
                    </p>
                </div>
                <div class="slider__city-wrapper">
                    <p class="slider__city">${city}, ${country}</p>
                </div>
            </div>
            <div class="slider__inner-box-one-right">
                <div class="slider__icon-wrapper">
                    <span class="slider__weather-icon"
                    ><i class="wi wi-day-sunny"></i>
                    </span>
                </div>
                <div class="slider__description-wrapper">
                    <p class="slider__image-description">${
                      current.description
                    }</p>
                </div>
                <div class="slider__time-wrapper">
                    <p class="slider__country-time slider__country-time-${result.city.replace(
                      /\s/g,
                      "-"
                    )}"></p>
              </div>
            </div>
        </div>
        <div class="slider__inner-box">
          <h3 class="slider__box-2-title">Hourly temperature</h3>
          <div class="slider__box-2-boxes">
           
          </div>
        </div>
        <div class="slider__inner-box">
          <h3 class="slider__box-3-title">Hourly weather</h3>
          <div class="slider__box-3-boxes">
          ${weatherFourHours.map(
            (item) => `<div class="slider__box-3">
            <p class="slider__hourly-weather-time">${new Date(
              format(
                utcToZonedTime(new Date(item.data * 1000), timezone),
                "yyyy-MM-dd HH:mm:ssXXX"
              )
            )
              .toLocaleString("en-US", {
                hour: "numeric",
                hour12: true,
              })
              .replace("PM", "p.m.")
              .replace("AM", "a.m.")}</p>
                  <div class="slider__box-3-wrapper">
                      <div class="slider__box-3-left">
                          <p class="slider__hourly-weather-temperature-wrapper">
                              ${item.temp.toFixed(1)}
                              <span class="slider__hourly-icon-celsius"
                                  ><i class="wi wi-degrees"></i>c</span>
                          </p>
                      </div>
                      <div class="slider__box-3-right">
                          <span class="slider__hourly-icon-weather"
                              ><i class="wi wi-day-cloudy"></i
                          ></span>
                      </div>
                  </div>
              <p class="slider__hourly-weather-description">
                  ${item.description}
              </p>
            </div>`
          )}
          </div>
        </div>
        <div class="slider__inner-box">
          <h3 class="slider__box-4-title">Details</h3>
          <div class="slider__inner-box-4 slider__inner-box-4-panel-${result.city.replace(
            /\s/g,
            "-"
          )}">
            <div class="slider__box-4-boxes">
              <div class="slider__box-4 slider__box-4-${result.city.replace(
                /\s/g,
                "-"
              )}">
                <span class="slider__box-details-icon">
                  <i class="wi wi-thermometer"></i>
                </span>
                <div class="slider__box-4-part2">
                  <div class="slider__box-4-part3">
                    <p class="slider__box-details-text">
                      ${current.feels_like.toFixed(1)}
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
              <div class="slider__box-4 slider__box-4-${result.city.replace(
                /\s/g,
                "-"
              )}">
                <span class="slider__box-details-icon">
                  <i class="wi wi-raindrops"></i>
                </span>
                <div class="slider__box-4-part2">
                  <div class="slider__box-4-part3">
                    <p class="slider__box-details-text">${current.humidity}%</p>
                  </div>
                  <div class="slider__box-4-part4">
                    <p class="slider__box-details-description">
                      Humidity
                    </p>
                  </div>
                </div>
              </div>
              <div class="slider__box-4 slider__box-4-${result.city.replace(
                /\s/g,
                "-"
              )}">
                <span class="slider__box-details-icon">
                  <i class="wi wi-strong-wind"></i>
                </span>
                <div class="slider__box-4-part2">
                  <div class="slider__box-4-part3">
                    <p class="slider__box-details-text">${current.wind_speed.toFixed(
                      1
                    )}/km</p>
                  </div>
                  <div class="slider__box-4-part4">
                    <p class="slider__box-details-description">Wind</p>
                  </div>
                </div>
              </div>
              <div class="slider__box-4 slider__box-4-${result.city.replace(
                /\s/g,
                "-"
              )}">
                <span class="slider__box-details-icon">
                  <i class="wi wi-barometer"></i>
                </span>
                <div class="slider__box-4-part2">
                  <div class="slider__box-4-part3">
                    <p class="slider__box-details-text">${current.pressure}</p>
                  </div>
                  <div class="slider__box-4-part4">
                    <p class="slider__box-details-description">
                      Pressure
                    </p>
                  </div>
                </div>
              </div>
              <div class="slider__box-4 slider__box-4-${result.city.replace(
                /\s/g,
                "-"
              )}">
                <span class="slider__box-details-icon">
                  <i class="wi wi-thermometer"></i>
                </span>
                <div class="slider__box-4-part2">
                  <div class="slider__box-4-part3">
                    <p class="slider__box-details-text">${current.dew_point.toFixed(
                      1
                    )}</p>
                  </div>
                  <div class="slider__box-4-part4">
                    <p class="slider__box-details-description">
                      Dev point
                    </p>
                  </div>
                </div>
              </div>
              <div class="slider__box-4 slider__box-4-${result.city.replace(
                /\s/g,
                "-"
              )}">
                <span class="slider__box-details-icon">
                  <i class="fas fa-eye"></i>
                </span>
                <div class="slider__box-4-part2">
                  <div class="slider__box-4-part3">
                    <p class="slider__box-details-text">${
                      current.visibility > 1000
                        ? current.visibility / 1000 + "/km"
                        : current.visibility + "/m"
                    }</p>
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
        
            ${result.daily.map(
              (
                item
              ) => `<div class="slider__box-4-days slider__box-4-days-${result.city.replace(
                /\s/g,
                "-"
              )}">
              <p class="slider__box-4-days-day">${new Date(item.data * 1000)
                .toDateString()
                .slice(0, 3)}</p>
                        <div class="slider__box-4-days-left">
                            <p class="slider__box-4-day-time">Day</p>
                            <p class="slider__box-4-days-details-text">
                            ${item.tempDay.toFixed(1)}
                                <span class="slider__box-4-days-details-text-icon">
                                    <i class="wi wi-degrees"></i>c
                                </span>
                            </p>
                            <span class="slider__box-4-days-icon-weather"
                            ><i class="wi wi-day-sunny"></i
                            ></span>
                        </div>
                        <div class="slider__box-4-days-right">
                            <p class="slider__box-4-day-time">Night</p>
                            <p class="slider__box-4-days-details-text">
                            ${item.tempNight.toFixed(1)}
                                <span class="slider__box-4-days-details-text-icon">
                                    <i class="wi wi-degrees"></i>c
                                </span>
                            </p>
                            <span class="slider__box-4-days-icon-weather"
                                ><i class="wi wi-day-sunny"></i
                            ></span>
                        </div>
                    </div>`
            )}
          
            </div>

            <div class="slider__box-4-boxes--hourly-weather">
                ${result.hourly.map(
                  (
                    item
                  ) => `<div class="slider__box-3-mobile slider__box-3-mobile-${result.city.replace(
                    /\s/g,
                    "-"
                  )}">
                            <p class="slider__hourly-time-mobile">${new Date(
                              format(
                                utcToZonedTime(
                                  new Date(item.data * 1000),
                                  timezone
                                ),
                                "yyyy-MM-dd HH:mm:ssXXX"
                              )
                            )
                              .toLocaleString("en-US", {
                                hour: "numeric",
                                hour12: true,
                              })
                              .replace("PM", "p.m.")
                              .replace("AM", "a.m.")}</p>
                                <div class="slider__box-3-wrapper-mobile">
                                    <div class="slider__box-3-left-mobile">
                                        <p class="slider__hourly-temperature-mobile">
                                            ${item.temp.toFixed(1)}
                                            <span class="slider__hourly-icon-mobile"
                                                ><i class="wi wi-degrees"></i>c</span>
                                        </p>
                                    </div>
                                    <div class="slider__box-3-right-mobile">
                                        <span class="slider__hourly-icon-weather-mobile"
                                            ><i class="wi wi-day-cloudy"></i
                                        ></span>
                                    </div>
                                </div>
                            <p class="slider__hourly-weather-description-mobile">
                                ${item.description}
                            </p>
                        </div>`
                )}
            </div>
          </div>
        </div>
        <div class="slider__bottom-panel slider__bottom-panel-${result.city.replace(
          /\s/g,
          "-"
        )}">
          <button class="slider__bottom-btn slider__bottom-btn-${result.city.replace(
            /\s/g,
            "-"
          )}">Details</button
          ><button class="slider__bottom-btn slider__bottom-btn-${result.city.replace(
            /\s/g,
            "-"
          )}">6 days forecast</button
          ><button class="slider__bottom-btn slider__bottom-btn-${result.city.replace(
            /\s/g,
            "-"
          )}">Hourly forecast</button>
        </div>`;
  };

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

  const events = {
    swipeUp: new Event("swipeUp"),
    swipeDown: new Event("swipeDown"),
    swipeLeft: new Event("swipeLeft"),
    swipeRight: new Event("swipeRight"),
  };

  const handleSearchWeather = (e) => {
    e.preventDefault();
    let cityInputValue = e.target[0].value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\u0142/g, "l")
      .toLowerCase();
    let countryInputValue = e.target[1].value.toLowerCase();

    if (cityInputValue === "" || countryInputValue === "") {
      msgAlert.innerHTML = "Please fill in all fields";
      setTimeout(() => (msgAlert.innerHTML = ""), 2000);
      return;
    }

    if (countryInputValue.length < 3) {
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
        const localStorageWeather = JSON.parse(
          localStorage.getItem("weather") || "[]"
        );

        const checkIsAdded = localStorageWeather.find(
          (item) => item.city === result.city
        );

        if (checkIsAdded) {
          msgAlert.innerHTML = "City is already added";
          setTimeout(() => (msgAlert.innerHTML = ""), 2000);
          return;
        }

        const detailsLocation = {
          city: result.city,
          country: result.country,
          hourly: result.hourly,
          timezone: result.timezone,
        };

        weathersArray = [...weathersArray, detailsLocation];

        if (localStorageWeather.length > 0) {
          weathersArray = [...localStorageWeather, detailsLocation];
          localStorage.setItem("weather", JSON.stringify(weathersArray));
        } else {
          localStorage.setItem("weather", JSON.stringify(weathersArray));
        }

        const { city, country, current, timezone } = result;

        const todayDate = getCurrentDate(timezone);

        if (sliderContent.children.length > 1) {
          sliderContent.style.transitionDuration = "0s";
          sliderContent.children[0].remove();
          sliderContent.children[sliderContent.children.length - 1].remove();
        }

        const weatherFourHours = result.hourly.slice(0, 4);

        const structureSlide = getStructureSlideWeather(
          result,
          city,
          country,
          current,
          timezone,
          todayDate,
          weatherFourHours
        );

        const slide = document.createElement("div");
        slide.className = "slider__image-wrapper";
        slide.innerHTML = structureSlide;

        sliderContent.appendChild(slide);

        setInterval(() => clock(result, timezone), 1000);

        const sliderBox2Boxes = document.querySelector(".slider__box-2-boxes");
        sliderBox2Boxes.className = `slider__box-2-boxes-${result.city}`;
        sliderBox2Boxes.style.position = "relative";
        sliderBox2Boxes.style.margin = "auto";
        sliderBox2Boxes.style.height = 80 + "%";
        sliderBox2Boxes.style.width = 99 + "%";

        const elementCanvas = document.createElement("canvas");
        elementCanvas.className = `myChart-${result.city.replace(/\s/g, "-")}`;
        sliderBox2Boxes.appendChild(elementCanvas);

        const config = getChartData(result, timezone);

        new Chart(
          document.querySelector(`.myChart-${result.city.replace(/\s/g, "-")}`),
          config
        );

        const {
          dotsWrapper,
          sliderBoxes3Mobile,
          sliderBoxes4,
          sliderBoxesDays4,
          detailsTitle,
          detailsWeather,
          innerBoxFour,
          buttonsButtom,
        } = getElementsApp(result);

        dotsWrapper.innerHTML = "";
        createDots(weathersArray);

        defaultVisiblityDetailsButton(buttonsButtom, sliderBoxes4);

        buttonsButtom.forEach((item, index) => {
          item.addEventListener("click", (e) =>
            handleClickButtonCheckWeather(
              e,
              index,
              detailsWeather,
              buttonsButtom,
              innerBoxFour,
              sliderBoxes3Mobile,
              sliderBoxesDays4,
              sliderBoxes4
            )
          );

          item.addEventListener("touchstart", (e) =>
            handleClickButtonCheckWeather(
              e,
              index,
              detailsWeather,
              buttonsButtom,
              innerBoxFour,
              sliderBoxes3Mobile,
              sliderBoxesDays4,
              sliderBoxes4
            )
          );
        });

        window.addEventListener("resize", () =>
          CheckSizeWindow(
            buttonsButtom,
            sliderBoxes3Mobile,
            sliderBoxesDays4,
            sliderBoxes4,
            innerBoxFour,
            detailsTitle
          )
        );

        createCopySlides(result, config);

        counter = 1;
        e.target[0].value = "";
        e.target[1].value = "";
      })
      .catch((err) => {
        msgAlert.innerHTML = err.message;
        setTimeout(() => (msgAlert.innerHTML = ""), 2000);
      });
  };

  form.addEventListener("submit", handleSearchWeather);

  const handleRemoveWeatherSlide = (e) => {
    const localStorageData = JSON.parse(
      localStorage.getItem("weather") || "[]"
    );

    if (
      e.path[3].childNodes[7].firstElementChild.attributes[1] &&
      localStorageData.length > 0
    ) {
      const elementStyle =
        e.path[3].childNodes[7].firstElementChild.attributes[1].nodeValue;
      const partElementStyle = elementStyle.slice(
        elementStyle.lastIndexOf("(")
      );
      let indexSlide;
      if (partElementStyle.indexOf("-") !== -1) {
        indexSlide = partElementStyle.slice(2, 3);
      } else {
        indexSlide = partElementStyle.slice(1, 2);
      }

      indexSlide = parseInt(indexSlide);

      const nameDeletedCity = localStorageData[indexSlide - 1].city;
      msgAlert.innerHTML = `${nameDeletedCity} removed successfully`;
      setTimeout(() => (msgAlert.innerHTML = ""), 2000);

      const updatedWeatherSlides = localStorageData.filter(
        (item, index) => index !== indexSlide - 1
      );

      localStorage.setItem("weather", JSON.stringify(updatedWeatherSlides));

      const slidesWeather = document.querySelectorAll(".slider__image-wrapper");

      slidesWeather.forEach((item, index) => {
        if (index === indexSlide) {
          item.parentNode.removeChild(item);
        }
      });

      if (sliderContent.children.length > 1) {
        sliderContent.style.transitionDuration = "0s";
        sliderContent.children[0].remove();
        sliderContent.children[sliderContent.children.length - 1].remove();
      }

      weathersArray = weathersArray.filter(
        (item, index) => index !== indexSlide - 1
      );

      sliderContent.style.transitionDuration = "0s";

      sliderContent.style.transform = "translateX(" + -widthDiv + "%)";

      const localStoragSlidesData = JSON.parse(
        localStorage.getItem("weather") || "[]"
      );

      const result = localStoragSlidesData[localStoragSlidesData.length - 1];

      if (result) {
        const config = getChartData(result, result.timezone);
        createCopySlides(result, config);
      }

      counter = 1;
      dotsWrapper.innerHTML = "";
      createDots(localStoragSlidesData);
    }
  };

  buttonRemove.addEventListener("click", handleRemoveWeatherSlide);

  const CheckSizeWindow = (
    buttonsButtom,
    sliderBoxes3Mobile,
    sliderBoxesDays4,
    sliderBoxes4,
    innerBoxFour,
    detailsTitle
  ) => {
    appWrapper.style.width = 1000 + "px";
    appWrapper.style.height = 600 + "px";

    let sizePrecent = (1000 * 100) / window.innerWidth;

    appWrapper.style.width = sizePrecent + "%";

    if (window.innerWidth < 1000 && window.innerWidth > 767) {
      sizeSliderDefaultAndResizeLess1000();
    } else if (window.innerWidth <= 767) {
      appWrapper.removeAttribute("style");
    }

    if (window.innerWidth >= 768 && innerBoxFour !== null) {
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
      detailsTitle.textContent = "Details";
    } else {
      const firstButtonCheckWeatherDetails = buttonsButtom[0];
      firstButtonCheckWeatherDetails?.classList.add("active-btn-bottom");
    }
  };

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
    if (counter >= sliderContent.children.length - 1) return;
    counter++;
    slideTransition();
  };

  const moveRight = (e) => {
    if (counter <= 0) return;
    counter--;
    slideTransition();
  };

  sliderContent.addEventListener("swipeLeft", moveLeft);
  sliderContent.addEventListener("swipeRight", moveRight);

  sliderContent.addEventListener("transitionend", () => {
    if (
      Boolean(sliderContent.children[counter]) &&
      sliderContent.children[counter].id === "last"
    ) {
      sliderContent.style.transitionDuration = "0s";
      counter = sliderContent.children.length - 2;
      sliderContent.style.transform =
        "translateX(" + -widthDiv * counter + "%)";
    } else if (
      Boolean(sliderContent.children[counter]) &&
      sliderContent.children[counter].id === "first"
    ) {
      sliderContent.style.transitionDuration = "0s";
      counter = 1;
      sliderContent.style.transform =
        "translateX(" + -widthDiv * counter + "%)";
    }
  });

  const handleClickDot = (index) => {
    sliderContent.style.transitionDuration = "0.6s";
    sliderContent.style.transform = `translateX(-${index + 1}00%)`;
    counter = index + 1;
  };
};

window.addEventListener("DOMContentLoaded", handleContentLoaded);
