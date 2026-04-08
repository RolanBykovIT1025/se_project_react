import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterClick,
  handleLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__user-container">
        <ToggleSwitch />
        {!isLoggedIn && (
          <>
            <button
              className="header__add-clothes-btn"
              type="button"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
            <button
              className="header__add-clothes-btn"
              type="button"
              onClick={handleLoginClick}
            >
              Sign In
            </button>
          </>
        )}
        {isLoggedIn && (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={currentUser.avatar}
                onError={(e) => {
                  e.target.src = defaultAvatar;
                }}
                alt="User avatar"
                className="header__avatar"
              />
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
