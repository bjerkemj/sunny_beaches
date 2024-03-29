const wavesController = require('./wavesController');
const weatherController = require('./weatherController');

const calculateCombinedData = async (latitude, longitude) => {
    const waveData = await wavesController.fetchWaveData(latitude, longitude);
    const weatherData = await weatherController.fetchWeatherData(latitude, longitude);

    let combinedScore = "";

    if (waveData > 2) {
        combinedScore = "perfect";
    } else if (waveData > 1.5 && (weatherData.weatherCondition === "good" || weatherData.weatherCondition === "fair")) {
        combinedScore = "perfect";
    } else if (waveData > 1.5) {
        combinedScore = "good";
    } else if (waveData > 1 && weatherData.weatherCondition === "good") {
        combinedScore = "good";
    } else if (waveData > 1) {
        combinedScore = "decent";
    } else if (waveData > 0.5 && weatherData.weatherCondition === "good") {
        combinedScore = "decent";
    } else {
        combinedScore = "bad";
    }

    return { combinedScore, waveData, weatherData:  idMapping[weatherData.symbolCode]};
};

module.exports = { calculateCombinedData };

const idMapping = {
    "clearsky_day": "clear sky",
    "clearsky_night": "clear sky",
    "clearsky_polartwilight": "clear sky",
    "fair_day": "fair",
    "fair_night": "fair",
    "partlycloudy_day": "partly cloudy",
    "partlycloudy_night": "partly cloudy",
    "partlycloudy_polartwilight": "partly cloudy",
    "cloudy": "cloudy",
    "rainshowers_day": "rain showers",
    "rainshowers_night": "rain showers",
    "rainshowers_polartwilight": "rain showers",
    "rainshowersandthunder_day": "rain showers and thunder",
    "rainshowersandthunder_night": "rain showers and thunder",
    "rainshowersandthunder_polartwilight": "rain showers and thunder",
    "sleetshowers_day": "sleet showers",
    "sleetshowers_night": "sleet showers",
    "sleetshowers_polartwilight": "sleet showers",
    "snowshowers_day": "snow showers",
    "snowshowers_night": "snow showers",
    "snowshowers_polartwilight": "snow showers",
    "rain": "rain",
    "heavyrain": "heavy rain",
    "heavyrainandthunder": "heavy rain and thunder",
    "sleet": "sleet",
    "snow": "snow",
    "snowandthunder": "snow and thunder",
    "fog": "fog",
    "sleetshowersandthunder_day": "sleet showers and thunder",
    "sleetshowersandthunder_night": "sleet showers and thunder",
    "sleetshowersandthunder_polartwilight": "sleet showers and thunder",
    "snowshowersandthunder_day": "snow showers and thunder",
    "snowshowersandthunder_night": "snow showers and thunder",
    "snowshowersandthunder_polartwilight": "snow showers and thunder",
    "rainandthunder": "rain and thunder",
    "sleetandthunder": "sleet and thunder",
    "lightrainshowersandthunder_day": "light rain showers and thunder",
    "lightrainshowersandthunder_night": "light rain showers and thunder",
    "lightrainshowersandthunder_polartwilight": "light rain showers and thunder",
    "heavyrainshowersandthunder_day": "heavy rain showers and thunder",
    "heavyrainshowersandthunder_night": "heavy rain showers and thunder",
    "heavyrainshowersandthunder_polartwilight": "heavy rain showers and thunder",
    "lightssleetshowersandthunder_day": "light sleet showers and thunder",
    "lightssleetshowersandthunder_night": "light sleet showers and thunder",
    "lightssleetshowersandthunder_polartwilight": "light sleet showers and thunder",
    "heavysleetshowersandthunder_day": "heavy sleet showers and thunder",
    "heavysleetshowersandthunder_night": "heavy sleet showers and thunder",
    "heavysleetshowersandthunder_polartwilight": "heavy sleet showers and thunder",
    "lightssnowshowersandthunder_day": "light snow showers and thunder",
    "lightssnowshowersandthunder_night": "light snow showers and thunder",
    "lightssnowshowersandthunder_polartwilight": "light snow showers and thunder",
    "heavysnowshowersandthunder_day": "heavy snow showers and thunder",
    "heavysnowshowersandthunder_night": "heavy snow showers and thunder",
    "heavysnowshowersandthunder_polartwilight": "heavy snow showers and thunder",
    "lightrain": "light rain",
    "lightsleet": "light sleet",
    "heavysleet": "heavy sleet",
    "lightsnow": "light snow",
    "heavysnow": "heavy snow",
  };
