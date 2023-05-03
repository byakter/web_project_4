export class Popup {
  constructor(popupSelctor) {
    this._popup = document.querySelector(popupSelctor);
    this.close = this.close.bind(this);
    this.closeByEscape = this.closeByEscape.bind(this);
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this.closeByEscape);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this.closeByEscape);
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
  closeByEscape(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
