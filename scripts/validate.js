function showError(input, settings) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
 
    input.classList.add(settings.inputErrorClass);

}

function hideError(input, settings) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";

    input.classList.remove(settings.inputErrorClass);

}

function checkValidity(input, settings) {
  if (input.validity.valid) {
    hideError(input, settings);
  } else {
    showError(input, settings);
  }
}

function toggleButtonState(inputList, submitButton, settings) {
const isValid = inputList.every(input => input.validity.valid);

if(isValid) {
    submitButton.disabled = false;
    submitButton.classList.remove(settings.inactiveButtonClass);
}else{
    submitButton.disabled = "disabled";
    submitButton.classList.add(settings.inactiveButtonClass);
}
}

function enableValidation(settings) {
  const forms = [...document.querySelectorAll(settings.formSelector)];

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => e.preventDefault());

    const inputList = [...form.querySelectorAll(settings.inputSelector)];
    const submitButton = form.querySelector(settings.submitButtonSelector);

    
  toggleButtonState(inputList, submitButton, settings);

    form.addEventListener('reset', () => {
      
      setTimeout(() => {
        toggleButtonState(inputList, submitButton, settings);
      }, 0); 
    });
  
    inputList.forEach((input) => {

      input.addEventListener("input", () => {
        checkValidity(input, settings);
        toggleButtonState(inputList, submitButton, settings);

        
      });
    });
  });
}

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);


