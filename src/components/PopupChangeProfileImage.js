import {Popup} from './Popup.js';

class PopupChangeProfileImage extends Popup {
   
    constructor(popupSelector, submitHandler) {
    
        super(popupSelector);
        this._submithandler = submitHandler;
        this._form = this._popup.querySelector(".popup__form")
      
      }   
    open() {
    
        // const image = document.querySelector(".profile__image");
    
         
        // image.src = link;
        // image.alt = 'Image of profile user';
        // this._link = link;
    
        super.open();
    
        
      }
      _getInputValues() {
        const inputValues = {}
        const inputs = [...this._form.querySelectorAll("input")]
    
        inputs.forEach(input =>{
            inputValues[input.name] = input.value;
        
        })
    
        return inputValues
      }
      setEventListeners() {
        this._form.addEventListener("submit", (e) => {
          e.preventDefault();
          const data = this._getInputValues();  //{avatar:"dfs"}
          this._submithandler(data);
          this.close();
        });
    
        super.setEventListeners();
      }
}

export default PopupChangeProfileImage;