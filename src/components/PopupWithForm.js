
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    
    super(popupSelector);
    this._submithandler = submitHandler;
    this._form = this._popup.querySelector(".popup__form");
    this._saveButton = this._popup.querySelector("button[type='submit']")
    if(this._saveButton){
      this._saveButtonText = this._saveButton.textContent;
    }
  
  }

  _getInputValues() {
    const inputValues = {}
    const inputs = [...this._form.querySelectorAll(".popup__input")]

    inputs.forEach(input =>{
        inputValues[input.name] = input.value;
    
    })

    return inputValues
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saving(true);
      this._submithandler(this._getInputValues());
      
      // this.close();
    });

    super.setEventListeners();
  }
  saving  (isSaving)  {
    if (!this._saveButton ) return
  if (isSaving) this._saveButton.textContent = "Saving...";
  else this._saveButton.textContent = this._saveButtonText;
};

  close () {
    this.saving(false);
    this._form.reset();

    super.close();
  }
   
}

