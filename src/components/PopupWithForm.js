
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    
    super(popupSelector);
    this._submithandler = submitHandler;
    this._form = this._popup.querySelector(".popup__form")
  
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

  close () {
    
    this._form.reset();

    super.close();
  }
}

