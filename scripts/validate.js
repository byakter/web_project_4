const showInputError = (
  formElement,
  input,
  errorMessage,
  { errorClass, inputErrorClass }
) => {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  input.classList.add(inputErrorClass);
};

const hideInputError = (
  formElement,
  input,
  { errorClass, inputErrorClass }
) => {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
};

const checkInputValidity = (formElement, input, settings) => {
  if (input.validity.valid) {
    hideInputError(formElement, input, settings);
  } else {
    showInputError(formElement, input, input.validationMessage, settings);
  }
};

const isValid = inputList => inputList.every((input) => input.validity.valid);

const toggleButtonState = (inputList, submitButton, {inactiveButtonClass}) => {
  

  if (isValid(inputList)) {
    submitButton.disabled = false;
    submitButton.classList.remove(inactiveButtonClass);
  } else {
    submitButton.disabled = "disabled";
    submitButton.classList.add(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = [...formElement.querySelectorAll(settings.inputSelector)];
  const submitButton = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, submitButton, settings);

  formElement.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButtonState(inputList, submitButton, settings);
    }, 0);
  });

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input, settings);
      toggleButtonState(inputList, submitButton, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = [...document.querySelectorAll(settings.formSelector)];

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => e.preventDefault());

    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
