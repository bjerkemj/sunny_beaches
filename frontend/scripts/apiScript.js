async function fetchConfig() {
  try {
    const response = await fetch("config.json");
    if (!response.ok) {
      throw new Error("Failed to fetch configuration");
    }
    const config = await response.json();
    return config;
  } catch (error) {
    console.error("Error fetching configuration:", error);
    return null;
  }
}

async function getApiUrl() {
  const config = await fetchConfig();
  if (config && config.apiUrl) {
    return config.apiUrl;
  } else {
    console.log("Configuration not found or apiUrl is missing.");
    return null;
  }
}

async function fetchData() {
  try {
    const apiUrl = await getApiUrl();

    if (!apiUrl) {
      console.error("API URL not available.");
      return;
    }

    const response = await fetch(`${apiUrl}/combined/main`);

    if (!response.ok) {
      throw new Error("Failed to fetch combined data.");
    }

    const data = await response.json();

    for (const beachName in data) {
      if (data.hasOwnProperty(beachName)) {
        const beachData = data[beachName];

        // Update the beach divs with specific data
        document.getElementById(
          `${beachName.replace(/ /g, "")}Weather`
        ).textContent = beachData.weatherData;
        document.getElementById(
          `${beachName.replace(/ /g, "")}Swell`
        ).textContent = `${beachData.waveData.toFixed(2)}m`;

        document.getElementById(
          `${beachName.replace(/ /g, "")}ColorSquare`
        ).style.backgroundColor = getColorFromScore(beachData.combinedScore);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function getColorFromScore(score) {
  const colorGradient = {
    perfect: "lime",
    good: "yellowgreen",
    decent: "orange",
    bad: "red",
  };
  return colorGradient[score] || "gray";
}

async function search() {
  const apiUrl = await getApiUrl();

  if (!apiUrl) {
    console.error("API URL not available.");
    return;
  }

  const latitudeInput = document.getElementById("latitudeInput").value;
  const longitudeInput = document.getElementById("longitudeInput").value;

  try {
    // Display "Loading..." while data is being fetched
    document.getElementById("searchWeather").textContent = "Loading...";
    document.getElementById("searchSwell").textContent = "Loading...";

    document.getElementById("search-div").style.display = "flex";
    // Make an API call using the latitude and longitude inputs
    const response = await fetch(
      `${apiUrl}/combined/${latitudeInput}/${longitudeInput}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data for coordinates: ${latitudeInput}, ${longitudeInput}`
      );
    }

    const data = await response.json();

    // Update the search result div with specific data
    document.getElementById("searchWeather").textContent = data.weatherData;
    document.getElementById("searchSwell").textContent =
      data.waveData.toFixed(2);
    document.getElementById("searchColorSquare").style.backgroundColor =
      getColorFromScore(data.combinedScore);
  } catch (error) {
    console.error("Error:", error);
    // Display an error message in case of an error
    document.getElementById("searchWeather").textContent = "Error";
    document.getElementById("searchSwell").textContent = "Error";
    document.getElementById("searchColorSquare").style.backgroundColor = "gray";
  }
}

async function fetchCounter() {
  
  try {
    const apiUrl = await getApiUrl();

      if (!apiUrl) {
        console.error("API URL not available.");
        return;
      }

    const counterResponse = await fetch(`${apiUrl}/counter`);
    if (!counterResponse.ok) {
      throw new Error("Failed to fetch counter value");
    }
    const counterData = await counterResponse.json();

    // Get the paragraph element where you want to display the counter
    const counterParagraph = document.getElementById("visitCounter");

    // Update the paragraph text content with the counter value
    counterParagraph.textContent = `Visit counter: ${counterData.counter}`;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fetch and display data when the page loads
window.addEventListener('load', fetchData);
window.addEventListener('load', fetchCounter);
