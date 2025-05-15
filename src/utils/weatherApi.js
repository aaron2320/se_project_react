// weatherApi.js
import { coordinates } from "./constants";

// Base configuration for API requests
const APIkey = "18a62bdc9af76694d30b50e1e3095c55";
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${APIkey}`;
const headers = {
  authorization: APIkey,
  "Content-Type": "application/json",
};

// Generic request function to handle API calls
const request = async (endpoint, options = {}) => {
  const finalOptions = {
    ...options,
  };

  const res = await fetch(endpoint, finalOptions);
  return checkResponse(res);
};

// Response handler to check and parse API responses
const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// Fetch weather data from OpenWeatherMap API
export const getWeather = () => {
  return request(baseUrl, { method: "GET" });
};

// Filter and process weather data for the app
export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name || "Denver";
  result.temp = {
    F: Math.round(data.main?.temp) || 999,
    C: Math.round((((data.main?.temp || 999) - 32) * 5) / 9),
  };

  // Determine detailed weather type and day/night
  const weatherConditions = data.weather || [];
  const { type, isDay } = getDetailedWeatherType(
    weatherConditions,
    data,
    result.temp.F
  );
  result.type = type;
  result.isDay = isDay;

  return result;
};

// Helper function to determine detailed weather type and day/night status
const getDetailedWeatherType = (weatherConditions, data, temperature) => {
  if (!weatherConditions.length) {
    return {
      type: temperature > 86 ? "hot" : temperature >= 67 ? "warm" : "cold",
      isDay: true,
    };
  }

  const conditions = weatherConditions.map((w) => ({
    main: w.main.toLowerCase(),
    id: w.id,
  }));
  const isDay = data.sys?.pod === "d";

  // Check for specific conditions using IDs
  const primaryCondition = conditions[0];
  if (primaryCondition.main === "clear" && primaryCondition.id === 800) {
    if (
      conditions.length > 1 &&
      conditions.some((c) => c.main === "clouds" && [801, 802].includes(c.id))
    ) {
      return {
        type: isDay ? "sunny with clouds" : "night time with clouds",
        isDay,
      };
    }
    return { type: isDay ? "sunny" : "night time", isDay };
  } else if (primaryCondition.main === "clouds") {
    if ([801, 802].includes(primaryCondition.id)) {
      return {
        type: isDay ? "sunny with clouds" : "night time with clouds",
        isDay,
      };
    } else if ([803, 804].includes(primaryCondition.id)) {
      return { type: isDay ? "cloudy" : "night time with clouds", isDay };
    }
  } else if (
    primaryCondition.main === "rain" ||
    primaryCondition.main === "drizzle"
  ) {
    return { type: "raining", isDay };
  } else if (
    primaryCondition.main === "fog" ||
    primaryCondition.main === "mist" ||
    primaryCondition.main === "haze"
  ) {
    return { type: "fog", isDay };
  } else if (primaryCondition.main === "snow") {
    return { type: "snowing", isDay };
  } else {
    return {
      type: temperature > 86 ? "hot" : temperature >= 67 ? "warm" : "cold",
      isDay,
    };
  }
};
