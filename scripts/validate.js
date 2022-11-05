const showInputError = (input, formEl, { errorClass }) => {
  const errorSpan = formEl.querySelector("#" + input.id + "-error");
  errorSpan.textContent = input.validationMessage;
  input.classList.add(errorClass);
};

const hideInputError = (input, formEl, { errorClass }) => {
  const errorSpan = formEl.querySelector("#" + input.id + "-error");
  errorSpan.textContent = "";
  input.classList.remove(errorClass);
};

const checkInputValidity = (formEl, input, settings) => {
  if (input.validity.valid) {
    hideInputError(input, formEl, settings);
  } else {
    showInputError(input, formEl, settings);
  }
};

const hasValidInputs = (inputList) =>
  inputList.every((input) => input.validity.valid === true);

const toggleButton = (inputList, button, settings) => {
  if (hasValidInputs(inputList)) {
    button.disable = false;
  } else {
    button.disable = true;
  }
};

const setEventListener = (formEl, settings) => {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const submitButton = formEl.querySelector(settings.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener("input", (evt) => {
      checkInputValidity(formEl, input, settings);
      toggleButton(inputList, submitButton, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formElements = Array.from(
    document.querySelectorAll(settings.formSelector)
  );
  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListener(formEl, settings);
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
