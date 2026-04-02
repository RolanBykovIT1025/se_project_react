import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({
  activeModal,
  card,
  onClose,
  handledDeleteCard,
  handleOverlay,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = currentUser && card && card.owner === currentUser._id;

  const deleteCardClick = () => {
    if (card?._id) {
      handledDeleteCard(card._id);
    }
  };

  return (
    <div
      onClick={handleOverlay}
      className={`modal ${activeModal === "preview" && "modal__opened"}`}
    >
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_item"
        ></button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__footer">
          <div className="modal__details">
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              className="modal__delete"
              onClick={deleteCardClick}
              type="button"
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
