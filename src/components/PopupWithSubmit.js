import Popup from './Popup.js';

class PopupWithSubmit extends Popup {
    setAction(action) {
        this._submitHandler = action;
    }
    setEventListeners() {
        this._form.addEventListener("submit", (e) => {
          e.preventDefault();
          this._submithandler();
          this.close();
        });
}
}

export default PopupWithSubmit;