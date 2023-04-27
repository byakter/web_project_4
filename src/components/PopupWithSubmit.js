import {Popup} from './Popup.js';

class PopupWithSubmit extends Popup {
    constructor(popupSelector){
        
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form_type_delete-card")
    }
    open (){
        super.open();
        
    }
    setAction(action) {
        this._submitHandler = action;
    }
    setEventListeners() {
        this._form.addEventListener("submit", (e) => {
          e.preventDefault();
          this._submitHandler();
        
        });

        super.setEventListeners();
}
}

export default PopupWithSubmit;