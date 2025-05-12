import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "../../index.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import WeatherAPI from "../../utils/weatherApi";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AppContext from "../../contexts/AppContext";
import { getToken, setToken } from "../../utils/token";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ItemModalDeleteConfirmation from "../ItemModalDeleteConfirmation/ItemModalDeleteConfirmation";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { JsonAPI } from "../../utils/api";

const weatherApi = new WeatherAPI();
const jsonServerApi = new JsonAPI();

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: true,
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    username: "",
    email: "",
    avatar: "",
    _id: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Function to fetch items from the database
  const fetchClothingItems = () => {
    jsonServerApi
      .getItems()
      .then((data) => {
        setClothingItems(data || []);
        console.log("Fetched Clothing Items:", data); // Debug log
      })
      .catch((err) => console.error("Error fetching items:", err));
  };

  useEffect(() => {
    fetchClothingItems();
  }, []);

  useEffect(() => {
    weatherApi
      .getWeather()
      .then((data) => {
        const filteredWeatherData = weatherApi.filterWeatherData(data);
        setWeatherData(filteredWeatherData);
        console.log("Updated Weather Data State:", filteredWeatherData);
      })
      .catch((err) => console.error("Error fetching weather:", err));
  }, []);

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      setIsLoading(false);
      return;
    }
    jsonServerApi
      .getUserInfo(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser({
          username: data.name || data.data?.name || "",
          email: data.email || data.data?.email || "",
          avatar: data.avatar || data.data?.avatar || "",
          _id: data._id || data.data?._id || "",
        });
      })
      .catch((err) => console.error("Error fetching user info:", err))
      .finally(() => setIsLoading(false));
  }, []);

  // Weather-based clothing suggestions with detailed conditions
  const getWeatherSuggestions = (weather, items) => {
    if (
      !weather ||
      !weather.temp ||
      !weather.type ||
      weather.isDay === undefined ||
      !items ||
      items.length === 0
    ) {
      console.log("Invalid input for suggestions:", { weather, items });
      return items || [];
    }

    console.log("Weather Data in Suggestions:", weather);
    const temp = weather.temp.F;
    const weatherType = weather.type.toLowerCase();
    console.log("Temp (F):", temp, "Type:", weatherType);

    let suggestions = [];
    if (weatherType.includes("sunny") || weatherType.includes("night time")) {
      if (temp <= 66)
        suggestions.push(
          "jacket",
          "sweater",
          "pants",
          "coat",
          "hoodie",
          "scarf",
          "beanie"
        );
      else if (temp >= 67 && temp <= 86)
        suggestions.push(
          "shirt",
          "jacket",
          "jeans",
          "sneakers",
          "loafers",
          "sweatshirt"
        );
      else
        suggestions.push(
          "t-shirt",
          "shorts",
          "dress",
          "skirt",
          "sandals",
          "cap",
          "sunglasses"
        );
    } else if (
      weatherType === "cloudy" ||
      weatherType === "sunny with clouds" ||
      weatherType === "night time with clouds"
    ) {
      if (temp <= 66)
        suggestions.push(
          "jacket",
          "sweater",
          "pants",
          "coat",
          "hoodie",
          "scarf",
          "beanie"
        );
      else if (temp >= 67 && temp <= 86)
        suggestions.push(
          "shirt",
          "jacket",
          "jeans",
          "sneakers",
          "loafers",
          "sweatshirt"
        );
      else suggestions.push("t-shirt", "shorts", "dress");
    } else if (weatherType === "raining") {
      suggestions.push("raincoat", "boots");
      if (temp <= 66)
        suggestions.push(
          "jacket",
          "pants",
          "coat",
          "hoodie",
          "scarf",
          "beanie"
        );
    } else if (weatherType === "fog") {
      if (temp <= 66)
        suggestions.push(
          "jacket",
          "sweater",
          "pants",
          "coat",
          "hoodie",
          "scarf",
          "beanie"
        );
      else
        suggestions.push(
          "shirt",
          "jacket",
          "jeans",
          "sneakers",
          "loafers",
          "sweatshirt"
        );
    } else if (weatherType === "snowing") {
      suggestions.push(
        "coat",
        "boots",
        "scarf",
        "jacket",
        "sweater",
        "pants",
        "hoodie",
        "beanie"
      );
    } else {
      if (temp <= 66)
        suggestions.push(
          "jacket",
          "sweater",
          "pants",
          "coat",
          "hoodie",
          "scarf",
          "beanie"
        );
      else if (temp >= 67 && temp <= 86)
        suggestions.push(
          "shirt",
          "jacket",
          "jeans",
          "sneakers",
          "loafers",
          "sweatshirt"
        );
      else
        suggestions.push(
          "t-shirt",
          "shorts",
          "dress",
          "skirt",
          "sandals",
          "cap",
          "sunglasses"
        );
    }

    console.log("Suggested Keywords:", suggestions);
    console.log(
      "Sample Item Names:",
      items.slice(0, 5).map((item) => item.name)
    );

    const filteredItems = items.filter((item) =>
      suggestions.some((suggestion) =>
        item.name.toLowerCase().includes(suggestion)
      )
    );
    console.log("Filtered Items:", filteredItems);
    return filteredItems.length > 0 ? filteredItems : items;
  };

  function handleCardClick(card) {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  function handleAddClick() {
    setActiveModal("add-garment");
  }

  function handleEditProfileClick() {
    setActiveModal("edit-profile");
  }

  function handleDeleteCardConfirmation() {
    setActiveModal("confirm-delete");
  }

  function handleSignupClick() {
    setActiveModal("signup");
  }

  function handleLoginClick() {
    setActiveModal("signin");
  }

  function handleDeleteCard() {
    const token = getToken();
    jsonServerApi
      .deleteItem(selectedCard._id, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
      })
      .then(() => closeActiveModal())
      .catch((err) => console.error("Error deleting item:", err));
  }

  function closeActiveModal() {
    setActiveModal("");
    setErrorMessage("");
  }

  function handleModalSwitch() {
    setActiveModal(activeModal === "signin" ? "signup" : "signin");
  }

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }

  function handleAddItemModalSubmit(
    { name, garmentUrl, tempButton },
    resetForm
  ) {
    const token = getToken();
    jsonServerApi
      .postItems({ name, imageUrl: garmentUrl, weather: tempButton }, token)
      .then((data) => {
        console.log("New Item Added:", data); // Debug log
        // Instead of appending, re-fetch the entire list to ensure consistency
        return fetchClothingItems();
      })
      .then(() => closeActiveModal())
      .then(() => resetForm())
      .catch((err) => console.error("Error adding item:", err));
  }

  function handleRegistration({ name, email, password, avatar }) {
    return jsonServerApi
      .createUser({ name, email, password, avatar })
      .then((response) => jsonServerApi.authorize({ email, password }))
      .then((data) => {
        if (data.token || data.data?.token) {
          setToken(data.token || data.data.token);
          return jsonServerApi.getUserInfo(data.token || data.data.token);
        }
      })
      .then((userinfo) => {
        setCurrentUser({
          username: userinfo.name || userinfo.data?.name || "",
          email: userinfo.email || userinfo.data?.email || "",
          avatar: userinfo.avatar || userinfo.data?.avatar || "",
          _id: userinfo._id || userinfo.data?._id || "",
        });
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/");
      })
      .catch((error) => {
        const message =
          error.message || "An error occurred during registration.";
        if (message.includes("Email already exists")) {
          return Promise.reject(
            "This email is already registered. Please use a different email or try logging in."
          );
        }
        return Promise.reject(message);
      });
  }

  function handleLogin({ email, password }) {
    if (!email || !password) return;
    jsonServerApi
      .authorize({ email, password })
      .then((data) => {
        if (data.token || data.data?.token) {
          setToken(data.token || data.data.token);
          return jsonServerApi.getUserInfo(data.token || data.data.token);
        }
      })
      .then((data) => {
        setCurrentUser({
          username: data.name || data.data?.name || "",
          email: data.email || data.data?.email || "",
          _id: data._id || data.data?._id || "",
          avatar: data.avatar || data.data?.avatar || "",
        });
        setIsLoggedIn(true);
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Invalid email or password");
      });
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ username: "", email: "", avatar: "", _id: "" });
    setToken("");
    navigate("/");
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = getToken();
    return jsonServerApi
      .updateUserInfo({ name, avatar }, token)
      .then(() => jsonServerApi.getUserInfo(token))
      .then((data) => {
        setCurrentUser({
          username: data.name || data.data?.name || "",
          email: data.email || data.data?.email || "",
          _id: data._id || data.data?._id || "",
          avatar: data.avatar || data.data?.avatar || "",
        });
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Invalid email or avatar URL");
        throw err;
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    if (!token) {
      return;
    }
    const promise = !isLiked
      ? jsonServerApi.addCardLike(id, token)
      : jsonServerApi.removeCardLike(id, token);
    promise
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) =>
        console.error("Error liking/unliking card:", err.message || err)
      );
  };

  const handleValidation = (data) => {
    const urlRegex = /^https?:\/\/\S+$/i;
    const errors = {};
    if (!data.name || data.name.length < 4)
      errors.name = "Name must be at least 4 characters";
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email))
      errors.email = "Invalid email address";
    if (!data.password || data.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (data.avatar && !urlRegex.test(data.avatar))
      errors.avatar = "Avatar must be a valid URL";
    return Object.keys(errors).length === 0 ? true : errors;
  };

  // Conditionally determine suggested items
  const suggestedItems =
    weatherData.temp &&
    weatherData.type &&
    weatherData.isDay !== undefined &&
    clothingItems.length > 0
      ? getWeatherSuggestions(weatherData, clothingItems)
      : clothingItems;

  return (
    <AppContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
        isLoggedIn,
        isLoading,
        currentUser,
        handleLogout,
        isOn: currentTemperatureUnit === "C",
        handleUpdateProfile,
        handleValidation,
        weatherData,
        getWeatherSuggestions,
      }}
    >
      <div className="page">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="page__content">
            <Header
              handleSignupClick={handleSignupClick}
              handleLoginClick={handleLoginClick}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onColor={"#fff"}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                    suggestedItems={suggestedItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={
                        currentUser._id
                          ? clothingItems.filter(
                              (item) => item.owner === currentUser._id
                            )
                          : []
                      }
                      handleAddClick={handleAddClick}
                      handleCardLike={handleCardLike}
                      handleEditProfileClick={handleEditProfileClick}
                      weatherData={weatherData}
                      getWeatherSuggestions={getWeatherSuggestions}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <RegisterModal
              isOpen={activeModal === "signup"}
              onClose={closeActiveModal}
              handleRegistration={handleRegistration}
              handleModalSwitch={handleModalSwitch}
            />
            <LoginModal
              isOpen={activeModal === "signin"}
              onClose={closeActiveModal}
              handleLogin={handleLogin}
              handleModalSwitch={handleModalSwitch}
              errorMessage={errorMessage}
            />
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={closeActiveModal}
              onDelete={handleDeleteCardConfirmation}
              isLoggedIn={isLoggedIn}
              currentUserId={currentUser._id}
            />
            <ItemModalDeleteConfirmation
              isOpen={activeModal === "confirm-delete"}
              onClose={closeActiveModal}
              onHandleDeleteCard={handleDeleteCard}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              handleUpdateProfile={handleUpdateProfile}
            />
            <Footer />
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
