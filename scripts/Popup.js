export class Popup {
  constructor(popupSelctor) {
    this._popup = document.querySelector(popupSelctor);
    this.close = this.close.bind(this);
    
  }
  open() {
    this._popup.classList.add("popup_opened");
  }

  close () {
    this._popup.classList.remove("popup_opened");
  }

  setEventListeners() {
    this._popup.querySelector(".popup__close").addEventListener("click", this.close);
  }
}

