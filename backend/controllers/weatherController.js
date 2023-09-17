const axios = require('axios');
const moment = require('moment-timezone');

const goodWeather = ["clearsky_day", "fair_day", "partlycloudy_day"];
const fairWeather = ["cloudy", "lightrain", "lightrainshowers_day", "rainshowers_day"];

async function fetchWeatherData(latitude, longitude) {
    try {
        const headers = {
            'User-Agent': 'QUT_UNI_PROJECT bjerkem.j@gmail.com'
        };

        // Make a GET request to the MET API to fetch weather data
        const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`;
        const response = await axios.get(apiUrl, { headers });

        // Convert timestamps to Brisbane time
        const timeZone = 'Australia/Brisbane';
        const convertedData = response.data;
        convertedData.properties.timeseries.forEach(data => {
            data.time = moment(data.time).tz(timeZone).format(); // Convert timestamp
        });

        // Calculate the target date and time for tomorrow at 8:00 AM
        const tomorrowMorning = moment().tz(timeZone).add(1, 'day').startOf('day').add(8, 'hours');

        // Find the weather data for tomorrow morning at 8:00 AM
        const targetData = convertedData.properties.timeseries.find(data => {
            const dataTime = moment(data.time);
            return dataTime.isSame(tomorrowMorning);
        });

        if (targetData && targetData.data.next_6_hours) {
            const symbolCode = targetData.data.next_6_hours.summary.symbol_code;
            let weatherCondition = '';
            if (goodWeather.includes(symbolCode)) {
                weatherCondition = 'good';
            } else if (fairWeather.includes(symbolCode)) {
                weatherCondition = 'fair';
            } else {
                weatherCondition = 'bad';
            }

            return {
                weatherCondition,
                symbolCode
            };

        } else {
            throw new Error('Weather data not found for tomorrow morning at 8:00 AM');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = {
    fetchWeatherData,
};
