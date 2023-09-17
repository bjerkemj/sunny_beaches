const axios = require('axios');

async function fetchWaveData(latitude, longitude) {
    try {
        // Make a GET request to the Open Meteo Marine API to fetch wave data
        const response = await axios.get(`https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&hourly=wave_height`);

        // Extract the relevant wave height information from the API response
        const waveHeightData = response.data.hourly.wave_height;

        // Extract and calculate the average wave heights from 10 am to 4 pm
        const startIndex = 34; // Index corresponding to 10 am
        const endIndex = 39;   // Index corresponding to 4 pm
        const waveHeightsInInterval = waveHeightData.slice(startIndex, endIndex + 1);

        // Calculate the average wave height in the interval
        const totalWaveHeight = waveHeightsInInterval.reduce((acc, waveHeight) => acc + waveHeight, 0);
        const averageWaveHeight = totalWaveHeight / waveHeightsInInterval.length;

        return averageWaveHeight;
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
        throw error;
    }
}

module.exports = {
    fetchWaveData,
};
