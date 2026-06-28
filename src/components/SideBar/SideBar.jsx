import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import defaultAvatar from "../../assets/avatar.svg";

function SideBar({ onEdit, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <div className="sidebar__user">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar || defaultAvatar}
          alt="User avatar"
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
