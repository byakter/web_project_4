import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submithandler = submitHandler;
    this._form = this._popup.querySelector(".popup__form");
    this.saveButton = this._popup.querySelector("button[type='submit']");
    if (this.saveButton) {
      this.saveButtonText = this.saveButton.textContent;
    }
  }

  _getInputValues() {
    const inputValues = {};
    const inputs = [...this._form.querySelectorAll(".popup__input")];

    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }
  saving(isSaving) {
    if (!this.saveButton) return;
    if (isSaving) this.saveButton.textContent = "Saving...";
    else this.saveButton.textContent = this.saveButtonText;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saving(true);
      this._submithandler(this._getInputValues());
    });
   
    super.setEventListeners();
  }

  // close() {
  //   super.close();
  // }
  open() {
    this.saving(false);
    this._form.reset();
    super.open();
  }
}
