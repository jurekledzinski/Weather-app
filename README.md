# ![Weather app](https://github.com/jurekledzinski/Weather-app/blob/main/imageGit/Find-weather.jpg)

# Find Weather

Weather application to find weather according to city and country.

### Features

- Change to slider after find weather in city.
- Display current date, time according to timezone to searched city, country.
- Display background images, icons, descriptions of weather, according to weather conditions and time of the day.
- Hourly temperature chart.
- Details current weather.
- Hourly forecast.
- 6 days forecast.
- Default page with logo change according to the time of the day.
- Animated loader.
- Remove searched cities from slider.
- Data is available after refresh of the page and is updated.

### Technologies

Build with:

- [Html](https://developer.mozilla.org/en-US/docs/Web/HTML) - HTML (HyperText Markup Language) is the most basic building block of the Web.
- [Css](https://developer.mozilla.org/en-US/docs/Web/CSS) - Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML.
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Parcel](https://parceljs.org/) - Blazing fast, zero configuration web application bundler.

### Installation

Application requires [Express](https://expressjs.com/) v4+ and [Parcel](https://parceljs.org/) v1+ to run.

To install you need also in .env file:
[Open weather map](https://openweathermap.org/api/one-call-api) from here one call api.
[LocationIQ](https://locationiq.com/) from here geolocation api key.

```sh
clone respository or download files
create .env file in root folder
add in .env file:
OPEN_WEATHER_API_KEY_PART_1=https://api.openweathermap.org/data/2.5/onecall?lat
OPEN_WEATHER_API_KEY_PART_2=&units=metric&exclude=minutely,alerts&appid=your api key
GEO_LOCATION_API_KEY=https://eu1.locationiq.com/v1/search.php?key=your api key
npm install in root folder
```

```sh
cd ./client
npm install in client folder
```

- In app.js file in root folder, in cors origin change to http://localhost:1234
- In package.json file in client folder, remove proxy.
- In main.js file in src folder, in both fetch change url address to fetch("http://localhost:5000")

### Run application

Run backend server

```sh
npm start_local - run locally
```

Run client server

```sh
cd ./client
npm run dev - run locally
You should see link in terminal http://localhost:1234 copy and past it, into the browsers search bar
Application should run :)
```

#### See live

[Find weather](https://lit-sands-29020.herokuapp.com)

## License

MIT © [Jurek Ledziński](https://github.com/jurekledzinski)
