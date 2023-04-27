import {Popup} from './Popup.js';

class PopupWithSubmit extends Popup {
    constructor(popupSelector){
        
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form_type_delete-card")
    }
    open (){
        super.open();
        // this._saveButton.focus();
    }
    setAction(action) {
        this._submitHandler = action;
    }
    setEventListeners() {
        this._form.addEventListener("submit", (e) => {
          e.preventDefault();
          this._submitHandler();
        //   this.close();
        });

        super.setEventListeners();
}
}

export default PopupWithSubmit;