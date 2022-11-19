class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }

  _showInputError = (input, errorMessage) => {
    const { inputErrorClass, errorClass } = this.settings;

    const errorElement = this.formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    input.classList.add(inputErrorClass);
  };

  _hideInputError = (input) => {
    const { inputErrorClass, errorClass } = this.settings;

    const errorElement = this.formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
  };

  _checkInputValidity = (input) => {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input, input.validationMessage);
    }
  };

  _setEventListeners = () => {
    const { inputSelector, submitButtonSelector } = this.settings;

    const inputList = [...this.formElement.querySelectorAll(inputSelector)];

    _toggleButtonState(inputList);

    this.formElement.addEventListener("reset", () => {
      setTimeout(() => {
        _toggleButtonState(inputList);
      }, 0);
    });

    

    _toggleButtonState = (inputList) => {
      const { inactiveButtonClass } = this.settings;
      const submitButton = this.formElement.querySelector(submitButtonSelector);
      const isValid = inputList.every((input) => input.validity.valid);

      if (isValid) {
        submitButton.disabled = false;
        submitButton.classList.remove(inactiveButtonClass);
      } else {
        submitButton.disabled = "disabled";
        submitButton.classList.add(inactiveButtonClass);
      }
    };

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList, submitButton, settings);
      });
    });
  };

  enableValidation() {
    this.formElement.addEventListener("submit", (e) => e.preventDefault());

    this._setEventListeners(formElement, settings);
  }
}

const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editFormElement = document.querySelector(".popup__form");
const addCardFormElement = document.querySelector(".popup__form");

const editFormValidator = new FormValidator(settings, editFormElement);
const addCardFormValidator = new FormValidator(settings, addCardFormElement);
