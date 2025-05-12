import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import AppContext from "../../contexts/AppContext";

function Header({
  handleLoginClick,
  handleSignupClick,
  handleAddClick,
  weatherData,
  onColor,
}) {
  const { isLoggedIn, currentUser, isOn } = useContext(AppContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="What to Wear App Logo" src={logo} />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch isOn={isOn} onColor={onColor} />

      {!isLoggedIn ? (
        <>
          <button
            type="button"
            className="header__signup-btn"
            onClick={handleSignupClick}
          >
            Sign Up
          </button>

          <button
            type="button"
            className="header__login-btn"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="header__add-clothes-btn"
            onClick={handleAddClick}
          >
            + Add clothes
          </button>
          {isLoggedIn && currentUser && (
            <>
              <Link to="/profile">
                <div className="header__user-container">
                  <p className="header__username">{currentUser.username}</p>
                  {currentUser.avatar && currentUser.avatar !== "" ? (
                    <img
                      src={currentUser.avatar || avatar}
                      alt={currentUser.username}
                      className="header__avatar"
                    />
                  ) : (
                    <span className="header__avatar">
                      {currentUser.username?.trim()
                        ? currentUser.username[0].toUpperCase()
                        : ""}
                    </span>
                  )}
                </div>
              </Link>
            </>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
