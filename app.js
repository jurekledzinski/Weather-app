const compression = require("compression");
const helmet = require("helmet");
const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const cors = require("cors");
const {
  geoLocationApiKey,
  openWeatherApiKeyPart1,
  openWeatherApiKeyPart2,
} = require("./configs/config");

const port = process.env.PORT || 5000;

const app = express();

app.use(compression());
app.use(helmet());
app.disable("x-powered-by");
app.use(
  cors({
    credentials: true,
    origin: "https://lit-sands-29020.herokuapp.com",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' firebasestorage.googleapis.com *.firebasestorage.googleapis.com; img-src * 'self' data: https:;font-src *; object-src 'self';script-src 'self';style-src 'self' 'unsafe-inline' fontawesome.com *.fontawesome.com fonts.google.com *.fonts.google.com fonts.googleapis.com *.fonts.googleapis.com;"
  );
  next();
});

app.post("/", function (req, res) {
  const { cityInputValue, countryInputValue } = req.body;

  let nameCity = "";
  let nameCountry = "";

  fetch(
    `${geoLocationApiKey}=${cityInputValue},$${countryInputValue}&format=json`
  )
    .then((res) => res.json())
    .then((data) => {
      const { display_name, lat, lon } = data[0];
      nameCity = display_name.slice(0, display_name.indexOf(","));
      nameCountry = display_name.slice(display_name.lastIndexOf(",") + 2);

      fetch(
        `${openWeatherApiKeyPart1}=${lat}&lon=${lon}${openWeatherApiKeyPart2}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          throw new Error("Can't find location");
        })
        .then((result) => {
          const sixDaysForecast = result.daily.slice(1, 7).map((item) => {
            return {
              data: item.dt,
              tempDay: item.temp.day,
              tempNight: item.temp.night,
              description: item.weather[0].description,
              idIcon: item.weather[0].id,
            };
          });

          const hourlyForecast = result.hourly.slice(1, 7).map((item) => {
            return {
              data: item.dt,
              temp: item.temp,
              description: item.weather[0].description,
              idIcon: item.weather[0].id,
            };
          });

          const weatherData = {
            city: nameCity,
            country: nameCountry,
            timezone: result.timezone,
            current: {
              date: result.current.dt,
              sunrise: result.current.sunrise,
              sunset: result.current.sunset,
              dew_point: result.current.dew_point,
              feels_like: result.current.feels_like,
              humidity: result.current.humidity,
              pressure: result.current.pressure,
              temp: result.current.temp,
              visibility: result.current.visibility,
              wind_speed: result.current.wind_speed,
              description: result.current.weather[0].description,
              idIcon: result.current.weather[0].id,
            },
            daily: sixDaysForecast,
            hourly: hourlyForecast,
          };

          return res.status(200).json(weatherData);
        })
        .catch((err) => {
          return res.status(404).json(err.message);
        });
    })
    .catch((err) => {
      return res.status(404).json(err.message);
    });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port);

module.exports = app;
