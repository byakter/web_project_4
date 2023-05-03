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
    const { inputSelector } = this.settings;

    this.inputList = [...this.formElement.querySelectorAll(inputSelector)];

    this.inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };

  _isValid = () => this.inputList.every((input) => input.validity.valid);

  _toggleButtonState = () => {
    const { inactiveButtonClass, submitButtonSelector } = this.settings;
    const submitButton = this.formElement.querySelector(submitButtonSelector);

    if (this._isValid()) {
      submitButton.disabled = false;
      submitButton.classList.remove(inactiveButtonClass);
    } else {
      submitButton.disabled = "disabled";
      submitButton.classList.add(inactiveButtonClass);
    }
  };

  resetValidation() {
    this.inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (e) => e.preventDefault());

    this._setEventListeners(this.settings, this.formElement);
  }
}

export default FormValidator;
