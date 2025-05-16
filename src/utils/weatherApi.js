const weatherApiKey = "18a62bdc9af76694d30b50e1e3095c55"; // Replace with your OpenWeatherMap API key
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=${weatherApiKey}&units=imperial`;

export const getWeather = () => {
  return fetch(weatherApiUrl).then((response) => {
    if (!response.ok) throw new Error("Weather API request failed");
    return response.json();
  });
};

export const filterWeatherData = (data) => {
  const currentHour = new Date().getHours();
  const isDay = currentHour >= 6 && currentHour < 18; // Daytime: 6 AM to 6 PM
  const temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  const weatherType = data.weather[0].description || "sunny with clouds";
  const city = data.name || "Denver";

  return { temp, type: weatherType, isDay, city };
};
