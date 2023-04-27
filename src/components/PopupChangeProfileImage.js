// import { Popup } from "./Popup.js";

// class PopupChangeProfileImage extends Popup {
//   constructor(popupSelector, submitHandler) {
//     super(popupSelector);
//     this._submithandler = submitHandler;
//     this._form = this._popup.querySelector(".popup__form");
//     this._saveButton = this._popup.querySelector("button[type='submit']")
//     if(this._saveButton){
//       this._saveButtonText = this._saveButton.textContent;
//     }
//   }

//   open() {
    
//     super.open();
//   }
//   _getInputValues() {
//     const inputValues = {};
//     const inputs = [...this._form.querySelectorAll("input")];

//     inputs.forEach((input) => {
//       inputValues[input.name] = input.value;
//     });

//     return inputValues;
//   }
//   saving  (isSaving)  {
//     if (!this._saveButton ) return
//   if (isSaving) this._saveButton.textContent = "Saving...";
//   else this._saveButton.textContent = this._saveButtonText;
// };
//   setEventListeners() {
//     this._form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       this.saving(true);
      
//       const data = this._getInputValues(); 

//       this._submithandler(data);
//       // this.close();
      
//     });
   
//     super.setEventListeners();
    
//   }
//   close () {
//     this.saving(false);
//     this._form.reset();

//     super.close();
//   }
// }


// export default PopupChangeProfileImage;
