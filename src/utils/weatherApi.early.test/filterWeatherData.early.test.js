import { filterWeatherData } from "../weatherApi";

describe("filterWeatherData() filterWeatherData method", () => {
  // Happy Path Tests
  describe("Happy Paths", () => {
    test("should correctly filter and transform weather data for a sunny day", () => {
      const input = {
        name: "San Francisco",
        main: { temp: 75 },
        dt: 1625074800,
        sys: { sunrise: 1625037600, sunset: 1625090400 },
        weather: [{ main: "Clear" }],
      };

      const expectedOutput = {
        city: "San Francisco",
        temp: { F: 75, C: 24 },
        type: "warm",
        icon: "daycloudy",
      };

      const result = filterWeatherData(input);
      expect(result).toEqual(expectedOutput);
    });

    test("should correctly filter and transform weather data for a rainy night", () => {
      const input = {
        name: "Seattle",
        main: { temp: 60 },
        dt: 1625100000,
        sys: { sunrise: 1625037600, sunset: 1625090400 },
        weather: [{ main: "Rain" }],
      };

      const expectedOutput = {
        city: "Seattle",
        temp: { F: 60, C: 16 },
        type: "cold",
        icon: "nightrain",
      };

      const result = filterWeatherData(input);
      expect(result).toEqual(expectedOutput);
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    test("should handle temperature exactly at the boundary of warm and hot", () => {
      const input = {
        name: "Phoenix",
        main: { temp: 86 },
        dt: 1625074800,
        sys: { sunrise: 1625037600, sunset: 1625090400 },
        weather: [{ main: "Clear" }],
      };

      const expectedOutput = {
        city: "Phoenix",
        temp: { F: 86, C: 30 },
        type: "hot",
        icon: "daycloudy",
      };

      const result = filterWeatherData(input);
      expect(result).toEqual(expectedOutput);
    });

    test("should handle unknown weather conditions gracefully", () => {
      const input = {
        name: "Unknown City",
        main: { temp: 70 },
        dt: 1625074800,
        sys: { sunrise: 1625037600, sunset: 1625090400 },
        weather: [{ main: "Alien" }],
      };

      const expectedOutput = {
        city: "Unknown City",
        temp: { F: 70, C: 21 },
        type: "warm",
        icon: "daycloudy", // fallback icon
      };

      const result = filterWeatherData(input);
      expect(result).toEqual(expectedOutput);
    });

    test("should handle temperature exactly at the boundary of cold and warm", () => {
      const input = {
        name: "Denver",
        main: { temp: 66 },
        dt: 1625074800,
        sys: { sunrise: 1625037600, sunset: 1625090400 },
        weather: [{ main: "Clouds" }],
      };

      const expectedOutput = {
        city: "Denver",
        temp: { F: 66, C: 19 },
        type: "warm",
        icon: "daycloudy",
      };

      const result = filterWeatherData(input);
      expect(result).toEqual(expectedOutput);
    });

    test("should handle foggy conditions during the day", () => {
      const input = {
        name: "London",
        main: { temp: 55 },
        dt: 1625074800,
        sys: { sunrise: 1625037600, sunset: 1625090400 },
        weather: [{ main: "Fog" }],
      };

      const expectedOutput = {
        city: "London",
        temp: { F: 55, C: 13 },
        type: "cold",
        icon: "dayfog",
      };

      const result = filterWeatherData(input);
      expect(result).toEqual(expectedOutput);
    });
  });
});
