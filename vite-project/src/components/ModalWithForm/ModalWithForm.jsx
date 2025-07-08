import "./ModalWithForm.css"

function ModalWithForm() {
  return (
    <div className="modal">
        <div className="modal__content">
            <h2 className="modal__title">New Garment</h2>
        <button type="button" className="modal__close">
          CLOSE
        </button>
      <form className="modal__form">
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal___input"
            id="name"
            placeholder="name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="text"
            className="modal___input"
            id="imageUrl"
            placeholder="Image URl"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather Type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input id="hot" type="radio" className="modal__radio-input" />
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input id="warm" type="radio" className="modal__radio-input" />
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input id="cold" type="radio" className="modal__radio-input" />
          </label>
        </fieldset>
        <button type="submti" className="modal__submit">Add Garment</button>
      </form>
      </div>
    </div>
  );
}

export default ModalWithForm;