import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function EditProfileModal({
  isOpen,
  onClose,
  onEditModalSubmit,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditModalSubmit({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Finalize changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="profile-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="profile-name"
          placeholder="Name"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="profile-imageURL" className="modal__label">
        Avatar Image Url{" "}
        <input
          type="url"
          className="modal__input"
          id="profile-imageURL"
          placeholder="Image URL"
          required
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}
