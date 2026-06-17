import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { defaultAvatar } from "../../assets/avatar.svg";

function SideBar({ onEdit, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <div className="sidebar__user">
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt="User avatar"
            className="header__avatar"
          />
        ) : (
          <span className="header__avatar header__avatar_placeholder">
            {currentUser.name?.charAt(0).toUpperCase()}
          </span>
        )}
        <img
          className="sidebar__avatar"
          src={currentUser.avatar || defaultAvatar}
          alt="user avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__options">
        <button type="button" className="sidebar__edit" onClick={onEdit}>
          Edit Profile
        </button>
        <button type="button" className="sidebar__logout" onClick={onLogout}>
          Log out
        </button>
      </div>
    </>
  );
}

export default SideBar;
