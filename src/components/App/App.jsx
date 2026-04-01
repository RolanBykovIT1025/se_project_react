import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import {
  addItem,
  getItems,
  removeItem,
  updateProfileData,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signin, signup, getUserData } from "../../utils/auth";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

const App = () => {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch((err) => {
        console.error("Error fetching clothing items:", err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserData(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSignupClick = () => {
    setActiveModal("new-user");
  };

  const handleLoginClick = () => {
    setActiveModal("login-user");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) =>
                card._id === updatedCard._id ? updatedCard : card,
              ),
            );
          })
          .catch((err) => console.error(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) =>
                card._id === updatedCard._id ? updatedCard : card,
              ),
            );
          })
          .catch(console.error);
  };

  const handleRegistration = (userData) => {
    signup({
      name: userData.name,
      avatar: userData.avatar,
      email: userData.email,
      password: userData.password,
    })
      .then(() => {
        return handleLogin({
          email: userData.email,
          password: userData.password,
        });
      })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        closeModal();
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getUserData(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeModal();
        navigate("/");
      })
      .catch(console.error);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");

    const newCardData = {
      name,
      imageUrl,
      weather,
    };

    addItem(newCardData, token)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeModal();
      })
      .catch(console.error);
  };

  const handleDeleteClick = (card) => {
    const token = localStorage.getItem("jwt");
    const filteredArr = clothingItems.filter((item) => {
      return item._id != card._id;
    });

    removeItem(card._id, token)
      .then(() => {
        setClothingItems(filteredArr);
        closeModal();
      })
      .catch(console.error);
  };

  const handleEditSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateProfileData({ token, name, avatar })
      .then(({ name, avatar }) => {
        setCurrentUser({ ...currentUser, name, avatar });
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onSecondaryButtonClick = () => {
    if (activeModal === "login-user") {
      setActiveModal("new-user");
    }
    if (activeModal === "new-user") {
      setActiveModal("login-user");
    }
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header
            handleAddClick={handleAddClick}
            handleSignupClick={handleSignupClick}
            handleLoginClick={handleLoginClick}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    handleEditProfileClick={handleEditProfileClick}
                    handleLogout={handleLogout}
                    isLoggedIn={isLoggedIn}
                    onCardClick={handleCardClick}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeModal}
        />

        <RegisterModal
          isOpen={activeModal === "new-user"}
          onClose={closeModal}
          onRegisterModalSubmit={handleRegistration}
          activeModal={activeModal}
          onSecondaryButtonClick={onSecondaryButtonClick}
          handleSignUpClick={onSecondaryButtonClick}
        />

        <LoginModal
          isOpen={activeModal === "login-user"}
          onClose={closeModal}
          onLoginModalSubmit={handleLogin}
          activeModal={activeModal}
          LoginClick={handleLoginClick}
          onSecondButtonClick={onSecondaryButtonClick}
          handleSignUpClick={onSecondaryButtonClick}
        />

        <EditProfileModal
          isOpen={activeModal === "edit-profile"}
          onClose={closeModal}
          onEditSubmit={handleEditSubmit}
          currentUser={currentUser}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
};

export default App;
