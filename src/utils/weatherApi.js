export const getWeather = ({latitude, longitude}, APIkey) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Error: ${response.status}`);
        }
    })
}

export const processWeatherData = (data) => {
    const result = {};
    result.type = getWeatherType(data.main.temp);
    result.temp = {F: data.main.temp};
    result.city = data.name;
    result.condition = data.weather[0].main.toLowerCase();
    result.isDay = isDay(data.sys, Date.now());
    return result;
};

const isDay = ({sunrise, sunset}, now) => {
    return sunrise * 1000 < now && now < sunset * 1000;
}

const getWeatherType = (temperature) => {
    if (temperature >= 86) {
        return 'hot';
      } else if (temperature >= 66) {
        return 'warm';
      } else {
        return 'cold';
      }
}
    