import React from "react";

const AppContext = React.createContext({
  currentTemperatureUnit: "F",
  handleToggleSwitchChange: () => {},
  isLoggedIn: false,
  isLoading: true,
  currentUser: null,
  handleLogout: () => {},
  isOn: false,
  handleUpdateProfile: () => {},
});

export default AppContext;
