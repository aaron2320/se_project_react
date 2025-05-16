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
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
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
import {
  getItems,
  postItems,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/API";
import {
  createUser,
  authorize,
  getUserInfo,
  updateUserInfo,
} from "../../utils/auth";

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
    getItems()
      .then((data) => {
        setClothingItems(data || []);
      })
      .catch((err) => {
        // Silently handle error to avoid console pollution
      });
  };

  useEffect(() => {
    fetchClothingItems();
  }, []);

  useEffect(() => {
    getWeather()
      .then((data) => {
        const filteredWeatherData = filterWeatherData(data);
        setWeatherData(filteredWeatherData);
      })
      .catch((err) => {
        // Silently handle error to avoid console pollution
      });
  }, []);

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      setIsLoading(false);
      return;
    }
    getUserInfo(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser({
          username: data.name || data.data?.name || "",
          email: data.email || data.data?.email || "",
          avatar: data.avatar || data.data?.avatar || "",
          _id: data._id || data.data?._id || "",
        });
      })
      .catch((err) => {
        // Silently handle error to avoid console pollution
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Universal submit handler
  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(() => closeActiveModal())
      .catch((err) => {
        // Silently handle error to avoid console pollution
      })
      .finally(() => setIsLoading(false));
  };

  // Compute the current weather type
  const currentWeatherType = () => {
    const temp = weatherData.temp.F;
    if (temp <= 66) return "cold";
    if (temp >= 67 && temp <= 86) return "warm";
    return "hot";
  };

  // Weather-based clothing suggestions
  const getWeatherSuggestions = (weather, items) => {
    if (
      !weather ||
      !weather.temp ||
      !weather.type ||
      weather.isDay === undefined ||
      !items ||
      items.length === 0
    ) {
      return items || [];
    }

    const temp = weather.temp.F;
    const weatherType = weather.type.toLowerCase();

    let suggestions = [];
    if (temp <= 66) {
      suggestions.push(
        "jacket",
        "sweater",
        "pants",
        "coat",
        "hoodie",
        "scarf",
        "beanie"
      );
    } else if (temp >= 67 && temp <= 86) {
      suggestions.push(
        "shirt",
        "jacket",
        "jeans",
        "sneakers",
        "loafers",
        "sweatshirt"
      );
    } else {
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

    return items.filter(
      (item) =>
        suggestions.some((suggestion) =>
          item.name.toLowerCase().includes(suggestion)
        ) ||
        item.weather === (temp <= 66 ? "cold" : temp >= 87 ? "hot" : "warm")
    );
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
    handleSubmit(() =>
      deleteItem(selectedCard._id, token).then(() =>
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        )
      )
    );
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

  const handleAddItemModalSubmit = (
    { name, garmentUrl, tempButton },
    resetForm
  ) => {
    const token = getToken();
    handleSubmit(() =>
      postItems(
        { name, imageUrl: garmentUrl, weather: tempButton },
        token
      ).then(() => fetchClothingItems())
    ).then(() => resetForm());
  };

  function handleRegistration({ name, email, password, avatar }) {
    return handleSubmit(() =>
      createUser({ name, email, password, avatar })
        .then((response) => authorize({ email, password }))
        .then((data) => {
          if (data.token || data.data?.token) {
            setToken(data.token || data.data.token);
            return getUserInfo(data.token || data.data.token);
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
          navigate("/");
        })
        .then(() => {
          if (errorMessage) setErrorMessage("");
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
        })
    );
  }

  function handleLogin({ email, password }) {
    if (!email || !password) return;
    handleSubmit(() =>
      authorize({ email, password })
        .then((data) => {
          if (data.token || data.data?.token) {
            setToken(data.token || data.data.token);
            return getUserInfo(data.token || data.data.token);
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
        })
        .catch(() => {
          setErrorMessage("Invalid email or password");
        })
    );
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ username: "", email: "", avatar: "", _id: "" });
    setToken("");
    navigate("/");
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = getToken();
    handleSubmit(() =>
      updateUserInfo({ name, avatar }, token)
        .then(() => getUserInfo(token))
        .then((data) => {
          setCurrentUser({
            username: data.name || data.data?.name || "",
            email: data.email || data.data?.email || "",
            _id: data._id || data.data?._id || "",
            avatar: data.avatar || data.data?.avatar || "",
          });
        })
        .catch(() => {
          setErrorMessage("Invalid email or avatar URL");
        })
    );
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    if (!token) {
      return;
    }
    const promise = !isLiked
      ? addCardLike(id, token)
      : removeCardLike(id, token);
    promise
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(() => {
        // Silently handle error to avoid console pollution
      });
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

  // Compute suggested items dynamically
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
              defaultWeatherType={currentWeatherType()} // Pass the current weather type
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
