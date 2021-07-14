import { utcToZonedTime, format } from "date-fns-tz";

const handleContentLoaded = () => {
  let weathersArray = [];
  const widthDiv = 100;
  let counter = 1;
  let localCounter = 0;
  let initialX;
  let initialY;
  let num = 0;
  let indexWeather = 0;
  let box3HourCelsius = [];
  let box3HourTime = [];
  let box3HourTemp = [];
  let box3HourIcon = [];
  let box3HourDescription = [];
  let box4CurrentIcons = [];
  let box4CurrentTemp = [];
  let box4CurrentDescription = [];
  let box4DaysLable = [];
  let box4DayTimes = [];
  let box4NightTimes = [];
  let box4TempDay = [];
  let box4TempNight = [];
  let box4IconsDay = [];
  let box4IconsNight = [];
  let box4HourTimes = [];
  let box4HourTemps = [];
  let box4HourIcons = [];
  let box4HourDescription = [];
  let box4HourCelsious = [];
  let buttons = [];
  let flag = true;

  const svgWrapper = document.querySelector(".slider__svg-wrapper");
  const svgLoader = document.querySelector(".svg-loader");
  const bgImageContainer = document.querySelector(".bgiContainer");
  const buttonRemove = document.querySelector(".search-bar__button-remove");
  const buttonSearch = document.querySelector(".search-bar__button-search");
  const form = document.querySelector(".form");
  const infoMessage = document.querySelector(".input-message");
  const searchInputCity = document.querySelector(
    ".search-bar__input.search-bar__input--city"
  );
  const searchInputCountry = document.querySelector(
    ".search-bar__input.search-bar__input--country"
  );
  const msgAlert = document.querySelector(".input-message");
  const appWrapper = document.querySelector(".app-wrapper");
  const logoStart = document.querySelector(".slider__wrapper-img");
  const sliderContent = document.querySelector(".slider__content");
  const dotsWrapper = document.querySelector(".slider__dots-inner-wrapper");

  const getElementsApp = (result) => {
    const dotsWrapper = document.querySelector(".slider__dots-inner-wrapper");
    const innerBox1All = document.querySelectorAll(
      ".slider__inner-box:nth-child(1)"
    );
    const innerBox2All = document.querySelectorAll(
      ".slider__inner-box:nth-child(2)"
    );
    const innerBox3All = document.querySelectorAll(
      ".slider__inner-box:nth-child(3)"
    );
    const innerBox4All = document.querySelectorAll(
      ".slider__inner-box:nth-child(4)"
    );
    const innerBox1CityAll = document.querySelectorAll(".slider__city");
    const innerBox1DateAll = document.querySelectorAll(".slider__current-date");
    const sliderBoxes3Mobile = document.querySelectorAll(
      `.slider__box-3-mobile-${result.city.replace(/\s/g, "-")}`
    );
    const sliderBoxes4 = document.querySelectorAll(
      `.slider__box-4-${result.city.replace(/\s/g, "-")}`
    );
    const sliderBoxesDays4 = document.querySelectorAll(
      `.slider__box-4-days-${result.city.replace(/\s/g, "-")}`
    );
    const sliderBox4DetailsIcon = document.querySelectorAll(
      ".slider__box-details-icon"
    );
    const sliderBox4TempCurrent = document.querySelectorAll(
      ".slider__box-details-text"
    );
    const sliderBox4Description = document.querySelectorAll(
      ".slider__box-details-description"
    );
    const sliderBox4Days1 = document.querySelectorAll(
      ".slider__box-4-days-day"
    );
    const sliderBox4DayTime = document.querySelectorAll(
      ".slider__box-4-day-time"
    );

    // -----------------------
    const sliderBox3HourCelsius = document.querySelectorAll(
      ".slider__hourly-icon-celsius"
    );
    const sliderBox3HourTime = document.querySelectorAll(
      ".slider__hourly-weather-time"
    );
    const sliderBox3HourTemp = document.querySelectorAll(
      ".slider__hourly-weather-temperature-wrapper"
    );
    const sliderBox3HourIcon = document.querySelectorAll(
      ".slider__hourly-icon-weather"
    );
    const sliderBox3HourDesc = document.querySelectorAll(
      ".slider__hourly-weather-description"
    );

    // -----------------------
    const sliderButtons = document.querySelectorAll(
      `.slider__bottom-btn.slider__bottom-btn-${result.city.replace(
        /\s/g,
        "-"
      )}`
    );
    // -----------------------

    const sliderBox4HourTimes = document.querySelectorAll(
      ".slider__hourly-time-mobile"
    );

    const sliderBox4HourTemps = document.querySelectorAll(
      ".slider__hourly-temperature-mobile"
    );

    const sliderBox4HourIcons = document.querySelectorAll(
      ".slider__hourly-icon-weather-mobile"
    );

    const sliderBox4HourDescriptions = document.querySelectorAll(
      ".slider__hourly-weather-description-mobile"
    );

    const sliderBox4HourCelsius = document.querySelectorAll(
      ".slider__hourly-icon-mobile"
    );

    const sliderBox4IconDay = document.querySelectorAll(
      ".slider__box-4-days-icon-weather-day"
    );
    const sliderBox4IconNight = document.querySelectorAll(
      ".slider__box-4-days-icon-weather-night"
    );

    const sliderButtonsPanel = document.querySelectorAll(
      ".slider__bottom-panel"
    );

    const sliderBox4NightTime = document.querySelectorAll(
      ".slider__box-4-day-night"
    );
    const sliderBox4TempDay = document.querySelectorAll(
      ".slider__box-4-days-details-text-day"
    );
    const sliderBox4TempNight = document.querySelectorAll(
      ".slider__box-4-days-details-text-night"
    );

    const sliderBox2Title = document.querySelectorAll(".slider__box-2-title");
    const sliderBox3Title = document.querySelectorAll(".slider__box-3-title");
    const sliderBox4Title = document.querySelectorAll(".slider__box-4-title");

    const sliderCelsius1 = document.querySelectorAll(".slider__celsius-icon");
    const sliderDesc1 = document.querySelectorAll(".slider__image-description");
    const sliderDots = document.querySelectorAll(".slider__dot");
    const sliderIcon1 = document.querySelectorAll(".slider__weather-icon");
    const sliderTemp1 = document.querySelectorAll(".slider__temperature");

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

    const timesCountry = document.querySelectorAll(".slider__country-time");

    const cutArray1 = [...sliderBox4DetailsIcon].slice(-6);
    const curArray2 = [...sliderBox4TempCurrent].slice(-6);
    const cutArray3 = [...sliderBox4Description].slice(-6);
    const cutArray4 = [...sliderBox4Days1].slice(-6);
    const cutArray5 = [...sliderBox4DayTime].slice(-6);
    const cutArray6 = [...sliderBox4NightTime].slice(-6);
    const cutArray7 = [...sliderBox4TempDay].slice(-6);
    const cutArray8 = [...sliderBox4TempNight].slice(-6);
    const cutArray9 = [...sliderBox4IconDay].slice(-6);
    const cutArray10 = [...sliderBox4IconNight].slice(-6);
    const cutArray11 = [...sliderBox4HourTimes].slice(-6);
    const cutArray12 = [...sliderBox4HourTemps].slice(-6);
    const cutArray13 = [...sliderBox4HourIcons].slice(-6);
    const cutArray14 = [...sliderBox4HourDescriptions].slice(-6);
    const cutArray15 = [...sliderBox4HourCelsius].slice(-6);
    const cutArray16 = [...sliderBox3HourTime].slice(-4);
    const cutArray17 = [...sliderBox3HourTemp].slice(-4);
    const cutArray18 = [...sliderBox3HourIcon].slice(-4);
    const cutArray19 = [...sliderBox3HourDesc].slice(-4);
    const cutArray20 = [...sliderBox3HourCelsius].slice(-4);
    const cutArray21 = [...sliderButtons].slice(-3);

    if (flag) {
      box4CurrentIcons.push({ detailsIcons: cutArray1 });
      box4CurrentTemp.push({ currentTemp: curArray2 });
      box4CurrentDescription.push({ currentDescription: cutArray3 });
      box4DaysLable.push({ dayLabel: cutArray4 });
      box4DayTimes.push({ dayTime: cutArray5 });
      box4NightTimes.push({ nightTime: cutArray6 });
      box4TempDay.push({ dayTemp: cutArray7 });
      box4TempNight.push({ dayNight: cutArray8 });
      box4IconsDay.push({ iconDay: cutArray9 });
      box4IconsNight.push({ iconNight: cutArray10 });
      box4HourTimes.push({ hours: cutArray11 });
      box4HourTemps.push({ hoursTemps: cutArray12 });
      box4HourIcons.push({ hoursIcons: cutArray13 });
      box4HourDescription.push({ hoursDesc: cutArray14 });
      box4HourCelsious.push({ hoursCelsiusIcon: cutArray15 });
      box3HourTime.push({ hours: cutArray16 });
      box3HourTemp.push({ hourTemp: cutArray17 });
      box3HourIcon.push({ hourIcon: cutArray18 });
      box3HourDescription.push({ hourDesc: cutArray19 });
      box3HourCelsius.push({ iconsCelsius: cutArray20 });
      buttons.push({ buttons: cutArray21 });
      flag = false;
    }

    return {
      buttons,
      box3HourCelsius,
      box3HourTime,
      box3HourTemp,
      box3HourIcon,
      box3HourDescription,
      box4HourCelsious,
      box4CurrentDescription,
      box4CurrentIcons,
      box4CurrentTemp,
      box4DaysLable,
      box4DayTimes,
      box4HourTimes,
      box4HourTemps,
      box4HourIcons,
      box4HourDescription,
      box4IconsDay,
      box4IconsNight,
      box4NightTimes,
      box4TempDay,
      box4TempNight,
      innerBox1All,
      innerBox2All,
      innerBox3All,
      innerBox4All,
      innerBox1CityAll,
      innerBox1DateAll,
      dotsWrapper,
      sliderBoxes3Mobile,
      sliderBoxes4,
      sliderBoxesDays4,
      sliderBox2Title,
      sliderBox3Title,
      sliderBox4Title,
      sliderButtonsPanel,
      sliderCelsius1,
      sliderDesc1,
      sliderDots,
      sliderIcon1,
      sliderTemp1,
      timesCountry,
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

  const checkPeriodOfCurrentDay = () => {
    if (new Date().getHours() <= 21 && new Date().getHours() >= 6) {
      return true;
    } else {
      return false;
    }
  };

  const setDefaultLogoPage = () => {
    const dayTime = checkPeriodOfCurrentDay();
    if (dayTime) {
      bgImageContainer.className = "bgiContainer time-day";
      bgImageContainer.style.filter = "initial";
      bgImageContainer.style.webkitFilter = "initial";
    } else {
      bgImageContainer.className = "bgiContainer time-night";
      bgImageContainer.style.filter = "initial";
      bgImageContainer.style.webkitFilter = "initial";
      searchInputCity.style.borderBottomColor = "#2C5364";
      searchInputCountry.style.borderBottomColor = "#2C5364";
      buttonSearch.style.background = "#2C5364";
      buttonRemove.style.background = "#2C5364";
    }

    buttonRemove.className = "search-bar__button-remove";
    buttonSearch.className = "search-bar__button-search";
    infoMessage.className = "input-message";
    searchInputCity.className = "search-bar__input search-bar__input--city";
    searchInputCountry.className =
      "search-bar__input search-bar__input--country";
  };

  setDefaultLogoPage();

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

  const getCurrentChartColors = (description) => {
    switch (description) {
      case "clear-sky-day":
        return "rgba(255,255,255,0.82)";
        break;
      case "clear-sky-night":
        return "rgba(255,255,255,0.82)";
        break;
      case "clouds-day":
        return "rgba(255,255,255,0.82)";
        break;
      case "clouds-night":
        return "rgba(255,255,255,0.82)";
        break;
      case "rain-day":
        return "rgba(0,0,0,0.82)";
        break;
      case "rain-night":
        return "rgba(255,255,255,0.82)";
        break;
      case "snow-day":
        return "rgba(255,255,255,0.82)";
        break;
      case "snow-night":
        return "rgba(255,255,255,0.82)";
        break;
      case "fog-day":
        return "rgba(0,0,0,0.82)";
        break;
      case "fog-night":
        return "rgba(255,255,255,0.82)";
        break;
      case "thunderstorm-day":
        return "rgba(255,255,255,0.82)";
        break;
      case "thunderstorm-night":
        return "rgba(255,255,255,0.82)";
        break;
      case "tornado":
        return "rgba(255,255,255,0.82)";
        break;
      case "squall-day-night":
        return "rgba(255,255,255,0.82)";
        break;
      default:
        "clouds-day";
        return "rgba(255,255,255,0.82)";
        break;
    }
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

    const { isDayOrNight } = checkCurrentDayOrNight(
      timezone,
      result.current.sunrise,
      result.current.sunset
    );

    const iconId = result.current.idIcon;
    const iconName = getCurrentImage(iconId, isDayOrNight, ",");
    const nameIcon = iconName.split(" ")[1];
    const colorChart = getCurrentChartColors(nameIcon);

    const data = {
      labels: labelHourly,
      datasets: [
        {
          label: "Temperature",
          backgroundColor: "rgb(255,255,255)",
          borderColor: `${colorChart}`,
          data: tempHourly,
          cubicInterpolationMode: "monotone",
          borderWidth: 0.7,
          yAxisID: "yAxes",
          XAxisID: "xAxes",
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
            display: false,
            position: "top",
            align: "end",
            labels: {
              color: "rgba(255,255,255,0.82)",
            },
          },
        },
        scales: {
          xAxes: {
            ticks: {
              color: `${colorChart}`,
              font: {
                weight: "lighter",
              },
            },
          },
          yAxes: {
            ticks: {
              color: `${colorChart}`,
              font: {
                weight: "lighter",
              },
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
    const localStorageWeather = JSON.parse(
      localStorage.getItem("weather") || "[]"
    );
    setTimeout(() => {
      num++;
      if (sliderContent.children[0]) {
        const firstSlide = sliderContent.children[0].cloneNode(true);

        firstSlide.setAttribute("id", "first");
        // firstSlide.children[1].children[1].children[0].className = `myChart-${result.city.replace(
        //   /\s/g,
        //   "-"
        // )}-${num}`;
        const lastSlide =
          sliderContent.children[sliderContent.children.length - 1].cloneNode(
            true
          );

        lastSlide.setAttribute("id", "last");
        sliderContent.insertBefore(lastSlide, sliderContent.children[0]);
        sliderContent.append(firstSlide);
        firstSlide.children[1].children[1].children[0].className = `myChart-${result.city.replace(
          /\s/g,
          "-"
        )}-${num}`;
        sliderContent.children[0].children[0].children[1].children[2].children[0].className = `slider__country-time slider__country-time-${result.city.replace(
          /\s/g,
          "-"
        )}-${num} ${
          localStorageWeather[localStorageWeather.length - 1].nameClass
        }`;

        let myChart = new Chart(
          document.querySelector(
            `.myChart-${result.city.replace(/\s/g, "-")}-${num}`
          ),
          config
        );

        console.log(myChart, "myChart przed destroy");

        myChart.destroy();

        myChart = new Chart(
          document.querySelector(
            `.myChart-${result.city.replace(/\s/g, "-")}-${num}`
          ),
          config
        );

        console.log(myChart, "myChart po destroy");

        let myChart1 = new Chart(
          document.querySelector(`.myChart-${result.city.replace(/\s/g, "-")}`),
          config
        );

        console.log(myChart1, "myChart1 przed destroy");

        myChart1.destroy();

        myChart1 = new Chart(
          document.querySelector(`.myChart-${result.city.replace(/\s/g, "-")}`),
          config
        );

        console.log(myChart1, "myChart1 po destroy");

        sliderContent.style.transitionDuration = "0s";
        sliderContent.style.transform = `translateX(-${100}%)`;
      }
    }, 300);
  };

  const setActiveStylesWhenRefresh = (result, isDayOrNight) => {
    const {
      buttons,
      box3HourCelsius,
      box3HourTime,
      box3HourTemp,
      box3HourIcon,
      box3HourDescription,
      box4HourCelsious,
      box4CurrentDescription,
      box4CurrentIcons,
      box4CurrentTemp,
      box4DaysLable,
      box4DayTimes,
      box4HourTimes,
      box4HourTemps,
      box4HourIcons,
      box4HourDescription,
      box4IconsDay,
      box4IconsNight,
      box4NightTimes,
      box4TempDay,
      box4TempNight,
      innerBox1All,
      innerBox2All,
      innerBox3All,
      innerBox4All,
      innerBox1CityAll,
      innerBox1DateAll,
      sliderBox2Title,
      sliderBox3Title,
      sliderBox4Title,
      sliderCelsius1,
      sliderButtonsPanel,
      sliderDesc1,
      sliderDots,
      sliderIcon1,
      sliderTemp1,
      timesCountry,
    } = getElementsApp(result);

    const localStorageWeather = JSON.parse(
      localStorage.getItem("weather") || "[]"
    );

    const btnSearchClass = buttonSearch.className.split(" ")[0];
    const btnRemoveClass = buttonRemove.className.split(" ")[0];
    const searchInputCityClass = searchInputCity.className;
    const searchInputCountryClass = searchInputCountry.className;
    buttonSearch.className = `${btnSearchClass} ${localStorageWeather[0].nameClass}`;
    buttonRemove.className = `${btnRemoveClass} ${localStorageWeather[0].nameClass}`;
    searchInputCity.className = `${searchInputCityClass} ${localStorageWeather[0].nameClass}`;
    searchInputCountry.className = `${searchInputCountryClass} ${localStorageWeather[0].nameClass}`;

    let classInnerBox1 = innerBox1All[indexWeather - 1].className.split(" ")[0];
    innerBox1All[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classInnerBox1
    );

    let classDate = innerBox1DateAll[indexWeather - 1].className.split(" ")[0];
    innerBox1DateAll[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classDate
    );

    let classCity = innerBox1CityAll[indexWeather - 1].className.split(" ")[0];
    innerBox1CityAll[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classCity
    );

    let classTime = timesCountry[indexWeather - 1].className;
    timesCountry[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classTime
    );

    let classTemp1 = sliderTemp1[indexWeather - 1].className;
    sliderTemp1[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classTemp1
    );

    let classCel1 = sliderCelsius1[indexWeather - 1].className;
    sliderCelsius1[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classCel1
    );

    let classDec1 = sliderDesc1[indexWeather - 1].className;
    sliderDesc1[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classDec1
    );

    let classIco1 = sliderIcon1[indexWeather - 1].className;
    sliderIcon1[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classIco1
    );

    let classInnerBox2 = innerBox2All[indexWeather - 1].className;
    innerBox2All[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classInnerBox2
    );

    let classInnerBox3 = innerBox3All[indexWeather - 1].className;
    innerBox3All[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classInnerBox3
    );

    let classInnerBox4 = innerBox4All[indexWeather - 1].className;
    innerBox4All[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classInnerBox4
    );

    let classBtnPan = sliderButtonsPanel[indexWeather - 1].className;
    sliderButtonsPanel[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classBtnPan
    );

    sliderDots.forEach((item, index) => {
      let classDot = item.className;
      item.className = `${classDot} ${localStorageWeather[0].nameClass}`;
    });

    let classTitle1 = sliderBox2Title[indexWeather - 1].className;
    sliderBox2Title[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classTitle1
    );

    let classTitle2 = sliderBox3Title[indexWeather - 1].className;
    sliderBox3Title[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classTitle2
    );

    let classTitle3 = sliderBox4Title[indexWeather - 1].className;
    sliderBox4Title[indexWeather - 1].className = getCurrentImage(
      result.current.idIcon,
      isDayOrNight,
      classTitle3
    );

    box4CurrentIcons[indexWeather - 1].detailsIcons.forEach((item) => {
      let classDetails1 = item.className.split(" ")[0];

      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classDetails1
      );
    });

    box4CurrentTemp[indexWeather - 1].currentTemp.forEach((item) => {
      let classTemp = item.className.split(" ")[0];

      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classTemp
      );
    });

    box4CurrentDescription[indexWeather - 1].currentDescription.forEach(
      (item) => {
        let classDescription = item.className.split(" ")[0];

        item.className = getCurrentImage(
          result.current.idIcon,
          isDayOrNight,
          classDescription
        );
      }
    );

    box4DaysLable[indexWeather - 1].dayLabel.forEach((item) => {
      let classLabel1 = item.className.split(" ")[0];

      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classLabel1
      );
    });

    box4DayTimes[indexWeather - 1].dayTime.forEach((item) => {
      let classDayTime = item.className.split(" ")[0];

      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classDayTime
      );
    });

    box4NightTimes[indexWeather - 1].nightTime.forEach((item) => {
      let classNightTime = item.className.split(" ")[0];

      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classNightTime
      );
    });

    box4TempDay[indexWeather - 1].dayTemp.forEach((item) => {
      let classDayTemp = item.className.split(" ")[0];

      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classDayTemp
      );
    });

    box4TempNight[indexWeather - 1].dayNight.forEach((item) => {
      let classNightTemp = item.className.split(" ")[0];

      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classNightTemp
      );
    });

    box4IconsDay[indexWeather - 1].iconDay.forEach((item) => {
      let classDayIcon = item.className.split(" ")[0];

      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classDayIcon
      );
    });

    box4IconsNight[indexWeather - 1].iconNight.forEach((item) => {
      let classNightIcon = item.className.split(" ")[0];

      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classNightIcon
      );
    });

    box4HourTimes[indexWeather - 1].hours.forEach((item) => {
      let classHour = item.className.split(" ")[0];

      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classHour
      );
    });

    box4HourTemps[indexWeather - 1].hoursTemps.forEach((item) => {
      let classHourTemp = item.className.split(" ")[0];
      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classHourTemp
      );
    });

    box4HourIcons[indexWeather - 1].hoursIcons.forEach((item) => {
      let classHourIcons = item.className.split(" ")[0];
      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classHourIcons
      );
    });

    box4HourDescription[indexWeather - 1].hoursDesc.forEach((item) => {
      let classHourDesc = item.className.split(" ")[0];
      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classHourDesc
      );
    });

    box4HourCelsious[indexWeather - 1].hoursCelsiusIcon.forEach((item) => {
      let classHourCelsius = item.className.split(" ")[0];
      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classHourCelsius
      );
    });

    box3HourTime[indexWeather - 1].hours.forEach((item) => {
      let classHour = item.className.split(" ")[0];
      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classHour
      );
    });

    box3HourTemp[indexWeather - 1].hourTemp.forEach((item) => {
      let classHourTemp = item.className.split(" ")[0];
      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classHourTemp
      );
    });

    box3HourIcon[indexWeather - 1].hourIcon.forEach((item) => {
      let classHourIcon = item.className.split(" ")[0];
      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classHourIcon
      );
    });

    box3HourDescription[indexWeather - 1].hourDesc.forEach((item) => {
      let classHourDesc = item.className.split(" ")[0];

      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classHourDesc
      );
    });

    box3HourCelsius[indexWeather - 1].iconsCelsius.forEach((item) => {
      let classHourCelsius = item.className.split(" ")[0];
      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classHourCelsius
      );
    });

    buttons[indexWeather - 1].buttons.forEach((item) => {
      let classBtn = item.className;
      item.className = getCurrentImage(
        result.current.idIcon,
        isDayOrNight,
        classBtn
      );
    });
  };

  //   --------------------------------------------------------
  const fetchWeahter = (item) => {
    showLoader();
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
          logoStart.style.display = "none";
          flag = true;

          console.log(result, " result fetch refresh");

          const { city, country, current, timezone } = result;
          const { sunrise, sunset } = current;

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

          const { isDayOrNight } = checkCurrentDayOrNight(
            timezone,
            sunrise,
            sunset
          );

          dotsWrapper.innerHTML = "";
          createDots(localStorageWeather);

          setActiveStylesWhenRefresh(result, isDayOrNight);

          console.log(indexWeather, "indexWeather");

          if (indexWeather - 1 === 0) {
            const { isDayOrNight } = checkCurrentDayOrNight(
              timezone,
              sunrise,
              sunset
            );

            const iconId = current.idIcon;

            const currentClass = bgImageContainer.className.split(" ")[0];

            const nameClassBg = getCurrentImage(
              iconId,
              isDayOrNight,
              currentClass
            );
            bgImageContainer.className = nameClassBg;
          }

          setInterval(() => clock(result, timezone), 1000);

          const sliderBox2Boxes = document.querySelector(
            ".slider__box-2-boxes"
          );
          sliderBox2Boxes.className = `slider__box-2-boxes-${result.city}`;
          sliderBox2Boxes.style.position = "relative";
          sliderBox2Boxes.style.margin = "auto";
          sliderBox2Boxes.style.height = `calc(${80}% - ${9}px)`;
          sliderBox2Boxes.style.width = 99 + "%";

          const elementCanvas = document.createElement("canvas");
          elementCanvas.className = `myChart-${result.city.replace(
            /\s/g,
            "-"
          )}`;
          sliderBox2Boxes.appendChild(elementCanvas);

          const config = getChartData(result, timezone);

          let chartFetch = new Chart(
            document.querySelector(
              `.myChart-${result.city.replace(/\s/g, "-")}`
            ),
            config
          );

          console.log(chartFetch, " chartFetch przed destroy");

          chartFetch.destroy();

          chartFetch = new Chart(
            document.querySelector(
              `.myChart-${result.city.replace(/\s/g, "-")}`
            ),
            config
          );

          console.log(chartFetch, " chartFetch po destroy");

          //   dotsWrapper.innerHTML = "";
          //   createDots(localStorageWeather);
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

          bgImageContainer.style.color = `blur(${2}px)`;
          bgImageContainer.style.webkitFilter = `blur(${2}px)`;
        })
        .catch((err) => {
          msgAlert.innerHTML = err.message;
          setTimeout(() => (msgAlert.innerHTML = ""), 2000);
        });
    }
  };

  let idInterval = window.setInterval(() => {
    console.log("download");
    if (indexWeather < localStorageWeather.length) {
      console.log("gdy jest cos w localstorage");
      const element = localStorageWeather[indexWeather];
      fetchWeahter(element);
      indexWeather++;
    } else {
      console.log("gdy nie ma nic w localstorage");
      window.clearInterval(idInterval);
      let clearInt = setInterval(() => {
        console.log("is ready");
        if (document.readyState === "complete") {
          const svgWrapper = document.querySelector(".slider__svg-wrapper");
          const svgLoader = document.querySelector(".svg-loader");
          let clearTime = setTimeout(() => {
            clearInterval(clearInt);
            clearTimeout(clearTime);
            svgWrapper.className = "slider__svg-wrapper hide";
            svgLoader.setAttribute("class", "svg-loader hide");
          }, 3000);

          console.log("doc ready");
        }
      }, 100);
    }
  }, 1000);

  //   TODO: sprawdzemie lokalizacji by wyliczyc z paczka wschod i zachod

  const checkCurrentDayOrNight = (timezone, sunrise, sunset) => {
    const currentDateUtc = utcToZonedTime(new Date(), timezone);
    const timeCountry = format(currentDateUtc, "yyyy-MM-dd HH:mm:ssXXX");
    let currentTimeCountry = new Date(timeCountry).getTime();

    const dateUtcSunrise = utcToZonedTime(new Date(sunrise * 1000), timezone);
    const countryTimeSunrise = format(dateUtcSunrise, "yyyy-MM-dd HH:mm:ssXXX");
    let dateSunrise = new Date(countryTimeSunrise);
    let timeSunriseMilliseconds = dateSunrise.getTime();

    const dateUtcSunset = utcToZonedTime(new Date(sunset * 1000), timezone);
    const countryTimeSunset = format(dateUtcSunset, "yyyy-MM-dd HH:mm:ssXXX");
    let dateSunset = new Date(countryTimeSunset);
    let timeSunsetMilliseconds = dateSunset.getTime();

    let isDayOrNight =
      currentTimeCountry > timeSunriseMilliseconds &&
      currentTimeCountry < timeSunsetMilliseconds;

    return { isDayOrNight, timeSunriseMilliseconds, timeSunsetMilliseconds };
  };

  const setClassSearchBar = (iconId, isDayOrNight) => {
    const classButtonRemove = buttonRemove.className;
    const classButtonSearch = buttonSearch.className;
    const classSearchInputCity = searchInputCity.className;
    const classSearchInputCountry = searchInputCountry.className;

    searchInputCity.className = getCurrentImage(
      iconId,
      isDayOrNight,
      classSearchInputCity
    );
    searchInputCountry.className = getCurrentImage(
      iconId,
      isDayOrNight,
      classSearchInputCountry
    );
    buttonRemove.className = getCurrentImage(
      iconId,
      isDayOrNight,
      classButtonRemove
    );
    buttonSearch.className = getCurrentImage(
      iconId,
      isDayOrNight,
      classButtonSearch
    );
  };

  const setClassActiveStyles = (iconId, isDayOrNight, result, localIndex) => {
    const {
      buttons,
      box3HourCelsius,
      box3HourTime,
      box3HourTemp,
      box3HourIcon,
      box3HourDescription,
      box4HourCelsious,
      box4CurrentDescription,
      box4CurrentIcons,
      box4CurrentTemp,
      box4DaysLable,
      box4DayTimes,
      box4HourTimes,
      box4HourTemps,
      box4HourIcons,
      box4HourDescription,
      box4IconsDay,
      box4IconsNight,
      box4NightTimes,
      box4TempDay,
      box4TempNight,
      innerBox1All,
      innerBox2All,
      innerBox3All,
      innerBox4All,
      innerBox1CityAll,
      innerBox1DateAll,
      sliderBox2Title,
      sliderBox3Title,
      sliderBox4Title,
      sliderButtonsPanel,
      sliderCelsius1,
      sliderDesc1,
      sliderDots,
      sliderIcon1,
      sliderTemp1,
      timesCountry,
    } = getElementsApp(result);

    const localStorageWeather = JSON.parse(
      localStorage.getItem("weather") || "[]"
    );

    const boxClass = innerBox1All[localIndex].className;
    innerBox1All[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      boxClass
    );

    const boxDateclass = innerBox1DateAll[localIndex].className;
    innerBox1DateAll[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      boxDateclass
    );

    const boxCityclass = innerBox1CityAll[localIndex].className;
    innerBox1CityAll[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      boxCityclass
    );

    const boxClassTime = timesCountry[localIndex].className;
    timesCountry[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      boxClassTime
    );

    const boxClassTemp1 = sliderTemp1[localIndex].className;
    sliderTemp1[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      boxClassTemp1
    );

    const boxClassCel1 = sliderCelsius1[localIndex].className;
    sliderCelsius1[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      boxClassCel1
    );

    const boxClassDec1 = sliderDesc1[localIndex].className;
    sliderDesc1[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      boxClassDec1
    );

    const boxClassIco1 = sliderIcon1[localIndex].className;
    sliderIcon1[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      boxClassIco1
    );

    const boxClass2 = innerBox2All[localIndex].className;
    innerBox2All[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      boxClass2
    );

    const boxClass3 = innerBox3All[localIndex].className;
    innerBox3All[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      boxClass3
    );

    const boxClass4 = innerBox4All[localIndex].className;
    innerBox4All[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      boxClass4
    );

    const btnPanelClass = sliderButtonsPanel[localIndex].className;
    sliderButtonsPanel[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      btnPanelClass
    );

    sliderDots.forEach((item, index) => {
      const dotClass = item.className;
      item.className = `${dotClass} ${localStorageWeather[0].nameClass}`;
    });

    const classTitleBox2 = sliderBox2Title[localIndex].className;
    sliderBox2Title[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      classTitleBox2
    );

    const classTitleBox3 = sliderBox3Title[localIndex].className;
    sliderBox3Title[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      classTitleBox3
    );

    const classTitleBox4 = sliderBox4Title[localIndex].className;
    sliderBox4Title[localIndex].className = getCurrentImage(
      iconId,
      isDayOrNight,
      classTitleBox4
    );

    box4CurrentIcons[localIndex].detailsIcons.forEach((item) => {
      const boxDetails = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, boxDetails);
    });

    box4CurrentTemp[localIndex].currentTemp.forEach((item) => {
      const classTemp = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classTemp);
    });

    box4CurrentDescription[localIndex].currentDescription.forEach((item) => {
      const classDescription = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classDescription);
    });

    box4DaysLable[localIndex].dayLabel.forEach((item) => {
      const classLabel1 = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classLabel1);
    });

    box4DayTimes[localIndex].dayTime.forEach((item) => {
      const classDayTime = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classDayTime);
    });

    box4NightTimes[localIndex].nightTime.forEach((item) => {
      const classNightTime = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classNightTime);
    });

    box4TempDay[localIndex].dayTemp.forEach((item) => {
      const classTempDay = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classTempDay);
    });

    box4TempNight[localIndex].dayNight.forEach((item) => {
      const classTempNight = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classTempNight);
    });

    box4IconsDay[localIndex].iconDay.forEach((item) => {
      const classIconDay = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classIconDay);
    });

    box4IconsNight[localIndex].iconNight.forEach((item) => {
      const classIconNight = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classIconNight);
    });

    box4HourTimes[localIndex].hours.forEach((item) => {
      const classHour = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classHour);
    });

    box4HourTemps[localIndex].hoursTemps.forEach((item) => {
      const classHourTemp = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classHourTemp);
    });

    box4HourIcons[localIndex].hoursIcons.forEach((item) => {
      const classHourIcon = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classHourIcon);
    });

    box4HourDescription[localIndex].hoursDesc.forEach((item) => {
      const classHourDesc = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classHourDesc);
    });

    box4HourCelsious[localIndex].hoursCelsiusIcon.forEach((item) => {
      const classHourCelsius = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classHourCelsius);
    });

    box3HourTime[localIndex].hours.forEach((item) => {
      const classHour = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classHour);
    });

    box3HourTemp[localIndex].hourTemp.forEach((item) => {
      const classHourTemp = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classHourTemp);
    });

    box3HourIcon[localIndex].hourIcon.forEach((item) => {
      const classHourIcon = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classHourIcon);
    });

    box3HourDescription[localIndex].hourDesc.forEach((item) => {
      const classHourDesc = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classHourDesc);
    });

    box3HourCelsius[localIndex].iconsCelsius.forEach((item) => {
      const classHourCelsius = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classHourCelsius);
    });

    buttons[localIndex].buttons.forEach((item) => {
      const classBtn = item.className;

      item.className = getCurrentImage(iconId, isDayOrNight, classBtn);
    });
  };

  const getCurrentIcon = (currentWeatherIdIcon, isDayOrNight) => {
    switch (currentWeatherIdIcon) {
      case 200:
      case 201:
      case 202:
        return isDayOrNight
          ? `<i class="wi wi-day-storm-showers"></i>`
          : `<i class="wi wi-night-alt-storm-showers"></i>`;
        break;
      case 210:
      case 211:
      case 212:
      case 221:
        return isDayOrNight
          ? `<i class="wi wi-day-lightning"></i>`
          : `<i class="wi wi-night-alt-lightning"></i>`;
        break;
      case 230:
      case 231:
      case 232:
        return isDayOrNight
          ? `<i class="wi wi-day-thunderstorm"></i>`
          : `<i class="wi wi-night-alt-thunderstorm"></i>`;
        break;
      case 300:
      case 301:
      case 302:
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
        return isDayOrNight
          ? `<i class="wi wi-day-sprinkle"></i>`
          : `<i class="wi wi-night-alt-sprinkle"></i>`;
        break;
      case 500:
        return isDayOrNight
          ? `<i class="wi wi-day-sprinkle"></i>`
          : `<i class="wi wi-night-alt-sprinkle"></i>`;
        break;
      case 501:
        return isDayOrNight
          ? `<i class="wi wi-day-rain"></i>`
          : `<i class="wi wi-night-alt-rain"></i>`;
        break;
      case 502:
        return isDayOrNight
          ? `<i class="wi wi-day-rain-wind"></i>`
          : `<i class="wi wi-night-alt-rain-wind"></i>`;
        break;
      case 503:
      case 504:
        return `<i class="wi wi-rain-wind"></i>`;
        break;
      case 511:
        return `<i class="wi wi-rain-mix"></i>`;
        break;
      case 520:
      case 521:
        return isDayOrNight
          ? `<i class="wi wi-day-showers"></i>`
          : `<i class="wi wi-night-alt-showers"></i>`;
        break;
      case 522:
      case 531:
        return `<i class="wi wi-showers"></i>`;
        break;
      case 600:
      case 601:
        return isDayOrNight
          ? `<i class="wi wi-day-snow"></i>`
          : `<i class="wi wi-night-alt-snow"></i>`;
        break;
      case 602:
        return isDayOrNight
          ? `<i class="wi wi-day-snow-wind"></i>`
          : `<i class="wi wi-night-alt-snow-wind"></i>`;
        break;
      case 611:
      case 612:
      case 613:
      case 615:
      case 616:
      case 620:
      case 621:
        return isDayOrNight
          ? `<i class="wi wi-day-sleet"></i>`
          : `<i class="wi wi-night-alt-sleet"></i>`;
        break;
      case 622:
        return isDayOrNight
          ? `<i class="wi wi-day-snow-wind"></i>`
          : `<i class="wi wi-night-alt-snow-wind"></i>`;
        break;
      case 701:
        return isDayOrNight
          ? `<i class="wi wi-day-fog"></i>`
          : `<i class="wi wi-night-fog"></i>`;
        break;
      case 711:
        return `<i class="wi wi-smoke"></i>`;
        break;
      case 721:
        return isDayOrNight
          ? `<i class="wi wi-day-haze"></i>`
          : `<i class="wi wi-night-fog"></i>`;
        break;
      case 731:
        return `<i class="wi wi-dust"></i>`;
        break;
      case 741:
        return isDayOrNight
          ? `<i class="wi wi-day-fog"></i>`
          : `<i class="wi wi-night-fog"></i>`;
        break;
      case 751:
        return `<i class="wi wi-sandstorm"></i>`;
        break;
      case 761:
        return `<i class="wi wi-dust"></i>`;
        break;
      case 762:
        return `<i class="wi wi-volcano"></i>`;
        break;
      case 771:
        return `<i class="wi wi-strong-wind"></i>`;
        break;
      case 781:
        return `<i class="wi wi-tornado"></i>`;
        break;
      case 800:
        return isDayOrNight
          ? `<i class="wi wi-day-sunny"></i>`
          : `<i class="wi wi-night-clear"></i>`;
        break;
      case 801:
        return isDayOrNight
          ? `<i class="wi wi-day-sunny-overcast"></i>`
          : `<i class="wi wi-night-alt-partly-cloudy"></i>`;
        break;
      case 802:
        return isDayOrNight
          ? `<i class="wi wi-day-cloudy"></i>`
          : `<i class="wi wi-night-alt-cloudy"></i>`;
        break;
      case 803:
        return isDayOrNight
          ? `<i class="wi wi-day-cloudy-high"></i>`
          : `<i class="wi wi-night-alt-cloudy-high"></i>`;
        break;
      case 804:
        return isDayOrNight
          ? `<i class="wi wi-cloudy"></i>`
          : `<i class="wi wi-cloudy"></i>`;
        break;
      default:
        break;
    }
  };

  const getCurrentImage = (weatherIdIcon, isDayOrNight, currentClass) => {
    switch (weatherIdIcon) {
      case 200:
      case 201:
      case 202:
      case 210:
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
        return isDayOrNight
          ? `${currentClass} thunderstorm-day`
          : `${currentClass} thunderstorm-night`;
        break;
      case 300:
      case 301:
      case 302:
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 511:
      case 520:
      case 521:
      case 522:
      case 531:
        return isDayOrNight
          ? `${currentClass} rain-day`
          : `${currentClass} rain-night`;
        break;
      case 600:
      case 601:
      case 602:
      case 611:
      case 612:
      case 613:
      case 615:
      case 616:
      case 620:
      case 621:
      case 622:
        return isDayOrNight
          ? `${currentClass} snow-day`
          : `${currentClass} snow-night`;
        break;
      case 701:
      case 721:
      case 741:
        return isDayOrNight
          ? `${currentClass} fog-day`
          : `${currentClass} fog-night`;
        break;
      case 771:
        return `${currentClass} squall-day-night`;
        break;
      case 781:
        return `${currentClass} tornado`;
        break;
      case 800:
        return isDayOrNight
          ? `${currentClass} clear-sky-day`
          : `${currentClass} clear-sky-night`;
        break;
      case 711:
      case 731:
      case 751:
      case 761:
      case 762:
      case 801:
      case 802:
      case 803:
      case 804:
        return isDayOrNight
          ? `${currentClass} clouds-day`
          : `${currentClass} clouds-night`;
        break;
      default:
        return isDayOrNight
          ? `${currentClass} clear-sky-day`
          : `${currentClass} clear-sky-night`;
        break;
    }
  };

  const getStructureSlideWeather = (
    result,
    city,
    country,
    current,
    timezone,
    todayDate,
    weatherFourHours
  ) => {
    const { sunrise, sunset } = current;
    const { isDayOrNight, timeSunriseMilliseconds, timeSunsetMilliseconds } =
      checkCurrentDayOrNight(timezone, sunrise, sunset);

    const currentWeatherIdIcon = result.current.idIcon;

    const checkTimeHourly = (hourlyTime) => {
      const dateHourly = utcToZonedTime(new Date(hourlyTime * 1000), timezone);
      const timeHourly = format(dateHourly, "yyyy-MM-dd HH:mm:ssXXX");
      let dateSunrise = new Date(timeHourly);
      let timeMilliseconds = dateSunrise.getTime();
      let checkDayNight =
        timeMilliseconds > timeSunriseMilliseconds &&
        timeMilliseconds < timeSunsetMilliseconds;

      return checkDayNight;
    };

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
                    >${getCurrentIcon(currentWeatherIdIcon, isDayOrNight)}
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
          ${weatherFourHours
            .map(
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
                              <span class="slider__hourly-icon-celsius"><i class="wi wi-degrees"></i>c</span>
                          </p>
                      </div>
                      <div class="slider__box-3-right">
                          <span class="slider__hourly-icon-weather">${getCurrentIcon(
                            item.idIcon,
                            checkTimeHourly(item.data)
                          )}</span>
                      </div>
                  </div>
                  <p class="slider__hourly-weather-description">
                  ${item.description}
                  </p>
            </div>`
            )
            .join("\n")}
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
        
            ${result.daily
              .map(
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
                            <p class="slider__box-4-days-details-text-day">
                            ${item.tempDay.toFixed(1)}
                                <span class="slider__box-4-days-details-text-icon">
                                    <i class="wi wi-degrees"></i>c
                                </span>
                            </p>
                            <span class="slider__box-4-days-icon-weather-day"
                            >${getCurrentIcon(item.idIcon, true)}</span>
                        </div>
                        <div class="slider__box-4-days-right">
                            <p class="slider__box-4-day-night">Night</p>
                            <p class="slider__box-4-days-details-text-night">
                            ${item.tempNight.toFixed(1)}
                                <span class="slider__box-4-days-details-text-icon">
                                    <i class="wi wi-degrees"></i>c
                                </span>
                            </p>
                            <span class="slider__box-4-days-icon-weather-night"
                                >${getCurrentIcon(item.idIcon, false)}</span>
                        </div>
                    </div>`
              )
              .join("\n")}
          
            </div>

            <div class="slider__box-4-boxes--hourly-weather">
                ${result.hourly
                  .map(
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
                                            >${getCurrentIcon(
                                              item.idIcon,
                                              checkTimeHourly(item.data)
                                            )}</span>
                                    </div>
                                </div>
                            <p class="slider__hourly-weather-description-mobile">
                                ${item.description}
                            </p>
                        </div>`
                  )
                  .join("\n")}
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

  const events = {
    swipeUp: new Event("swipeUp"),
    swipeDown: new Event("swipeDown"),
    swipeLeft: new Event("swipeLeft"),
    swipeRight: new Event("swipeRight"),
  };

  const showLoader = () => {
    console.log(svgWrapper, "svgWrapper");
    svgWrapper.className = "slider__svg-wrapper";
    svgLoader.setAttribute("class", "svg-loader");
  };

  const hideLoader = () => {
    svgWrapper.className = "slider__svg-wrapper hide";
    svgLoader.setAttribute("class", "svg-loader hide");
  };

  const checkBackgroundLoaded = (description) => {
    switch (description) {
      case "clear-sky-day":
        let img1 = new Image();
        img1.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Clear-day-1.jpg?alt=media&token=8834f4e8-a226-4173-b5b2-b890025976c5";
        img1.onload = () => {
          console.log("Clear sky is loaded");
          hideLoader();
        };
        break;
      case "clear-sky-night":
        let img2 = new Image();
        img2.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Clear-night.jpg?alt=media&token=197080c1-f461-45b1-9b4b-d68b20967418";
        img2.onload = () => {
          console.log("Clear sky nigh is loaded");
          hideLoader();
        };
        break;
      case "clouds-day":
        let img3 = new Image();
        img3.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Clouds-day.jpg?alt=media&token=81afcae1-f9a5-414e-8c3f-c4244da3e1fb";
        img3.onload = () => {
          console.log("Clouds day is loaded");
          hideLoader();
        };
        break;
      case "clouds-night":
        let img4 = new Image();
        img4.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Clouds-night.jpg?alt=media&token=17cbae71-3f03-490f-aa63-2e08f720cffc";
        img4.onload = () => {
          console.log("Clouds night is loaded");
          hideLoader();
        };
        break;
      case "rain-day":
        let img5 = new Image();
        img5.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Rain-day.jpg?alt=media&token=bd119570-5618-4817-84a4-80615dc834ef";
        img5.onload = () => {
          console.log("rain-day is loaded");
          hideLoader();
        };
        break;
      case "rain-night":
        let img6 = new Image();
        img6.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Rain-night-1.jpg?alt=media&token=cdfd7122-a210-4286-8297-f4704afd88a2";
        img6.onload = () => {
          console.log("rain-night is loaded");
          hideLoader();
        };
        break;
      case "snow-day":
        let img7 = new Image();
        img7.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Snow-day.jpg?alt=media&token=442f207f-ed45-47c2-a8a9-e217a9c19f21";
        img7.onload = () => {
          console.log("snow-day is loaded");
          hideLoader();
        };
        break;
      case "snow-night":
        let img8 = new Image();
        img8.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Snow-night.jpg?alt=media&token=064812b3-2975-4001-bce8-dca50d2f42ca";
        img8.onload = () => {
          console.log("snow-night is loaded");
          hideLoader();
        };
        break;
      case "fog-day":
        let img9 = new Image();
        img9.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Fog-day.jpg?alt=media&token=201d3d94-5615-4a71-a191-94e7091b4eab";
        img9.onload = () => {
          console.log("fog day is loaded");
          hideLoader();
        };
        break;
      case "fog-night":
        let img10 = new Image();
        img10.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Fog-nigth.jpg?alt=media&token=10958719-f5ee-4f2b-b1d1-6c02c8a85fb1";
        img10.onload = () => {
          console.log("fog night is loaded");
          hideLoader();
        };
        break;
      case "thunderstorm-day":
        let img11 = new Image();
        img11.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Thunderstorm-day.jpg?alt=media&token=206107f9-9a19-4173-8759-7b704aa96fc4";
        img11.onload = () => {
          console.log("thunderstorm-day is loaded");
          hideLoader();
        };
        break;
      case "thunderstorm-night":
        let img12 = new Image();
        img12.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Thunderstorm-night.jpg?alt=media&token=9fcd179b-31a4-48eb-93d5-bc7f6058cfde";
        img12.onload = () => {
          console.log("thunderstorm-night is loaded");
          hideLoader();
        };
        break;
      case "tornado":
        let img13 = new Image();
        img13.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Tornado.jpg?alt=media&token=f78abe9e-bfd4-4af5-919c-5fc0fb516260";
        img13.onload = () => {
          console.log("tornado is loaded");
          hideLoader();
        };
        break;
      case "squall-day-night":
        let img14 = new Image();
        img14.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Squall-day-night.jpg?alt=media&token=4ffc0d9d-96f5-429f-95d7-6a641cdef4f6";
        img14.onload = () => {
          console.log("squall-day-night is loaded");
          hideLoader();
        };
        break;
      default:
        let img15 = new Image();
        img15.src =
          "https://firebasestorage.googleapis.com/v0/b/weather-app-79d32.appspot.com/o/Clear-day-1.jpg?alt=media&token=8834f4e8-a226-4173-b5b2-b890025976c5";
        img15.onload = () => {
          console.log("default is loaded");
          hideLoader();
        };
        break;
    }
  };

  const handleSearchWeather = (e) => {
    e.preventDefault();
    showLoader();
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
        const { city, country, current, timezone } = result;
        logoStart.style.display = "none";
        flag = true;
        console.log(result);

        const { isDayOrNight } = checkCurrentDayOrNight(
          result.timezone,
          result.current.sunrise,
          result.current.sunset
        );

        console.log(isDayOrNight, "checkerkDayOrNight gdy szukamy");

        const iconId = result.current.idIcon;

        // głowny bgimage
        const currentClass = bgImageContainer.className.split(" ")[0];
        const nameClass = getCurrentImage(iconId, isDayOrNight, currentClass);
        const classMessage = infoMessage.className.split(" ")[0];
        const alertClass = getCurrentImage(iconId, isDayOrNight, classMessage);

        checkBackgroundLoaded(nameClass.split(" ")[1]);

        console.log(nameClass.split(" ")[1]);

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
          current: result.current,
          hourly: result.hourly,
          timezone: result.timezone,
          nameClass: nameClass.split(" ")[1],
        };

        weathersArray = [...weathersArray, detailsLocation];

        // tu juz nie musze dodawac gdy cos jest w localstorage poniewaz to sie nie zmienia potem do czasu klik dot swipe

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

        searchInputCity.removeAttribute("style");
        searchInputCountry.removeAttribute("style");
        buttonSearch.removeAttribute("style");
        buttonRemove.removeAttribute("style");

        if (localStorageWeather.length > 0) {
          bgImageContainer.className = `${currentClass} ${localStorageWeather[0].nameClass}`;
          infoMessage.className = `${classMessage} ${localStorageWeather[0].nameClass}`;
          weathersArray = [...localStorageWeather, detailsLocation];
          localStorage.setItem("weather", JSON.stringify(weathersArray));
        } else {
          bgImageContainer.className = nameClass;
          infoMessage.className = alertClass;
          bgImageContainer.style.color = `blur(${2}px)`;
          bgImageContainer.style.webkitFilter = `blur(${2}px)`;
          setClassSearchBar(iconId, isDayOrNight);
          localStorage.setItem("weather", JSON.stringify(weathersArray));
        }

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

        const localIndex = localStorageWeather.length;

        setClassActiveStyles(iconId, isDayOrNight, result, localIndex);

        setInterval(() => clock(result, timezone), 1000);

        const sliderBox2Boxes = document.querySelector(".slider__box-2-boxes");
        sliderBox2Boxes.className = `slider__box-2-boxes-${result.city}`;
        sliderBox2Boxes.style.position = "relative";
        sliderBox2Boxes.style.margin = "auto";
        sliderBox2Boxes.style.height = `calc(${80}% - ${9}px)`;
        sliderBox2Boxes.style.width = 99 + "%";

        const elementCanvas = document.createElement("canvas");
        elementCanvas.className = `myChart-${result.city.replace(/\s/g, "-")}`;
        sliderBox2Boxes.appendChild(elementCanvas);

        const config = getChartData(result, timezone);

        let charty = new Chart(
          document.querySelector(`.myChart-${result.city.replace(/\s/g, "-")}`),
          config
        );

        console.log(charty, " charty");

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

        localCounter = 0;
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

  const setClassAfterRemove = (lcnameClass) => {
    const firstClassBg = bgImageContainer.className.split(" ")[0];
    const firstClassBtnR = buttonRemove.className.split(" ")[0];
    const firstClassBtnS = buttonSearch.className.split(" ")[0];
    const messageClass = infoMessage.className.split(" ")[0];
    const oneClassCity = searchInputCity.className.split(" ")[0];
    const twoClassCity = searchInputCity.className.split(" ")[1];
    const oneClassCountry = searchInputCountry.className.split(" ")[0];
    const twoClassCountry = searchInputCountry.className.split(" ")[1];

    infoMessage.className = `${messageClass} ${lcnameClass}`;

    bgImageContainer.className = `${firstClassBg} ${lcnameClass}`;
    buttonRemove.className = `${firstClassBtnR} ${lcnameClass}`;
    buttonSearch.className = `${firstClassBtnS} ${lcnameClass}`;
    searchInputCity.className = `${oneClassCity} ${twoClassCity} ${lcnameClass}`;
    searchInputCountry.className = `${oneClassCountry} ${twoClassCountry} ${lcnameClass}`;
  };

  const removeElementsArray = (indexNum) => {
    const updateBox4CurrentIcons = box4CurrentIcons.filter(
      (item, index) => index !== indexNum
    );

    const updateBox4CurrentTemp = box4CurrentTemp.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox4CurrentDesc = box4CurrentDescription.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox4DaysLabel = box4DaysLable.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox4DaysTimes = box4DayTimes.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox4NightTimes = box4NightTimes.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox4TempDay = box4TempDay.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox4TempNight = box4TempNight.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox4IconsDay = box4IconsDay.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox4IconsNight = box4IconsNight.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox4HourTimes = box4HourTimes.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox4HourTemps = box4HourTemps.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox4HourIcons = box4HourIcons.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox4HourDesc = box4HourDescription.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox4HourCelsius = box4HourCelsious.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox3HourTime = box3HourTime.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox3HourTemp = box3HourTemp.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox3HourIcon = box3HourIcon.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox3HourDesc = box3HourDescription.filter(
      (item, index) => index !== indexNum
    );

    const updatedBox3HourCelsius = box3HourCelsius.filter(
      (item, index) => index !== indexNum
    );

    const updatedButtons = buttons.filter((item, index) => index !== indexNum);

    console.log(updateBox4CurrentIcons, " updateBox4CurrentIcons");
    console.log(updateBox4CurrentTemp, " updateBox4CurrentTemp");
    console.log(updatedBox4CurrentDesc, " updatedBox4CurrentDesc");
    console.log(updatedBox4DaysLabel, " updatedBox4DaysLabel");
    console.log(updatedBox4DaysTimes, " updatedBox4DaysTimes");
    console.log(updatedBox4NightTimes, " updatedBox4NightTimes");
    console.log(updatedBox4TempDay, " updatedBox4TempDay");
    console.log(updatedBox4TempNight, " updatedBox4TempNight");
    console.log(updatedBox4IconsDay, " updatedBox4IconsDay");
    console.log(updatedBox4IconsNight, " updatedBox4IconsNight");
    console.log(updatedBox4HourTimes, " updatedBox4HourTimes");
    console.log(updatedBox4HourTemps, " updatedBox4HourTemps");
    console.log(updatedBox4HourIcons, " updatedBox4HourIcons");
    console.log(updatedBox4HourDesc, " updatedBox4HourDesc");
    console.log(updatedBox4HourCelsius, " updatedBox4HourCelsius");
    console.log(updatedBox3HourTime, " updatedBox3HourTime");
    console.log(updatedBox3HourTemp, " updatedBox3HourTemp");
    console.log(updatedBox3HourIcon, " updatedBox3HourIcon");
    console.log(updatedBox3HourDesc, " updatedBox3HourDesc");
    console.log(updatedBox3HourCelsius, " updatedBox3HourCelsius");
    console.log(updatedButtons, " updatedButtons");

    box4CurrentIcons = updateBox4CurrentIcons;
    box4CurrentTemp = updateBox4CurrentTemp;
    box4CurrentDescription = updatedBox4CurrentDesc;
    box4DaysLable = updatedBox4DaysLabel;
    box4DayTimes = updatedBox4DaysTimes;
    box4NightTimes = updatedBox4NightTimes;
    box4TempDay = updatedBox4TempDay;
    box4TempNight = updatedBox4TempNight;
    box4IconsDay = updatedBox4IconsDay;
    box4IconsNight = updatedBox4IconsNight;
    box4HourTimes = updatedBox4HourTimes;
    box4HourTemps = updatedBox4HourTemps;
    box4HourIcons = updatedBox4HourIcons;
    box4HourDescription = updatedBox4HourDesc;
    box4HourCelsious = updatedBox4HourCelsius;
    box3HourTime = updatedBox3HourTime;
    box3HourTemp = updatedBox3HourTemp;
    box3HourIcon = updatedBox3HourIcon;
    box3HourDescription = updatedBox3HourDesc;
    box3HourCelsius = updatedBox3HourCelsius;
    buttons = updatedButtons;
  };

  const handleRemoveWeatherSlide = (e) => {
    const localStorageData = JSON.parse(
      localStorage.getItem("weather") || "[]"
    );

    if (
      e.path[3].childNodes[7].firstElementChild.attributes[1] &&
      localStorageData.length > 0
    ) {
      buttonRemove.disabled = true;
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
      setTimeout(() => {
        msgAlert.innerHTML = "";
        buttonRemove.disabled = false;
      }, 2000);

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

      if (localStoragSlidesData.length > 0) {
        setClassAfterRemove(localStoragSlidesData[0].nameClass);
      } else {
        console.log("remove default");
        setDefaultLogoPage();
      }

      if (result) {
        const config = getChartData(result, result.timezone);
        createCopySlides(result, config);
      }

      localCounter = 0;
      counter = 1;
      dotsWrapper.innerHTML = "";
      createDots(localStoragSlidesData);

      const sliderDots = document.querySelectorAll(".slider__dot");

      if (sliderDots.length > 0) {
        sliderDots.forEach((item) => {
          const classDot = item.className.split(" ")[0];
          item.className = `${classDot} ${localStoragSlidesData[0].nameClass}`;
        });
      }

      removeElementsArray(indexSlide - 1);

      if (localStoragSlidesData.length === 0) {
        logoStart.style.display = "flex";
      }
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

  const setClassSingleSlide = (lcClassName) => {
    const firstClassBgc = bgImageContainer.className.split(" ")[0];
    const firstClassBtnR = buttonRemove.className.split(" ")[0];
    const firstClassBtnS = buttonSearch.className.split(" ")[0];
    const messageClass = infoMessage.className.split(" ")[0];
    const oneClassCity = searchInputCity.className.split(" ")[0];
    const twoClassCity = searchInputCity.className.split(" ")[1];
    const oneClassCountry = searchInputCountry.className.split(" ")[0];
    const twoClassCountry = searchInputCountry.className.split(" ")[1];
    bgImageContainer.className = `${firstClassBgc} ${lcClassName}`;
    buttonRemove.className = `${firstClassBtnR} ${lcClassName}`;
    buttonSearch.className = `${firstClassBtnS} ${lcClassName}`;
    infoMessage.className = `${messageClass} ${lcClassName}`;
    searchInputCity.className = `${oneClassCity} ${twoClassCity} ${lcClassName}`;
    searchInputCountry.className = `${oneClassCountry} ${twoClassCountry} ${lcClassName}`;
    const sliderDots = document.querySelectorAll(".slider__dot");
    console.log(sliderDots, " slide");

    sliderDots.forEach((item) => {
      const classDot = item.className.split(" ")[0];
      item.className = `${classDot} ${lcClassName}`;
    });
  };

  const update = () => {
    sliderContent.style.transform = "translateX(" + -widthDiv * counter + "%)";
  };

  const slideTransition = () => {
    sliderContent.style.transition = "transform 0.6s ease-in-out";
    update();
  };

  const moveLeft = (e) => {
    const localStoragSlidesData = JSON.parse(
      localStorage.getItem("weather") || "[]"
    );

    localCounter++;
    if (localCounter >= localStoragSlidesData.length) localCounter = 0;
    setClassSingleSlide(localStoragSlidesData[localCounter].nameClass);

    if (counter >= sliderContent.children.length - 1) return;
    console.log(counter, " counter left  before ++");
    counter++;
    console.log(counter, " counter left after ++ ");

    slideTransition();
  };

  const moveRight = (e) => {
    const localStoragSlidesData = JSON.parse(
      localStorage.getItem("weather") || "[]"
    );

    localCounter--;
    if (localCounter < 0) localCounter = localStoragSlidesData.length - 1;
    setClassSingleSlide(localStoragSlidesData[localCounter].nameClass);

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
    const lStorageSlide = JSON.parse(localStorage.getItem("weather") || "[]");
    sliderContent.style.transitionDuration = "0.6s";
    sliderContent.style.transform = `translateX(-${index + 1}00%)`;
    counter = index + 1;
    setClassSingleSlide(lStorageSlide[index].nameClass);
  };
};

window.addEventListener("DOMContentLoaded", handleContentLoaded);
