import "./index.css";
import { Card } from "./Card.js";
import FormValidator from "../scripts/FormValidator.js";
import {
  openPopup,
  previewPopup,
  closePopup,
  previewPopupImageElement,
  previewPopupTitle,
} from "../scripts/utils.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo";

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__subtitle",
});


const imageModal = new PopupWithImage(".popup_type_preview");
imageModal.setEventListeners();

const editModal = new PopupWithForm(".popup_type_profile", (data) => userInfo.setUserInfo(data));


editModal.setEventListeners();

const addCardModal = new PopupWithForm(".popup_type_card", (data) => {
  const cardInput = { name: data["place-name"], link: data.link };
  const cardElement = generateCard(cardInput);

  imageCards.prepend(cardElement);
});

addCardModal.setEventListeners();

const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const profileFormElement = document.querySelector(".popup__form_type_profile");
const addCardFormElement = document.querySelector(".popup__form_type_card");

const editFormValidator = new FormValidator(settings, profileFormElement);
const addCardFormValidator = new FormValidator(settings, addCardFormElement);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/*-----------------------------------------------------------------------//
                                edit profile
------------------------------------------------------------------------*/
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_profile");

//const nameInput = document.querySelector(".popup__input_type_name");
//const jobInput = document.querySelector(".popup__input_type_profession");

//const profileName = document.querySelector(".profile__title");
//const profileJob = document.querySelector(".profile__subtitle");

//-------------------------------------------------------------------------//

profileEditButton.addEventListener("click", function () {
  const data = userInfo.getUserInfo()
  editModal.open();
  editFormValidator.resetValidation();
  nameInput.value = data.name;
   jobInput.value = data.job;
});

profilePopup.addEventListener("click", function (evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(profilePopup);
  }
});

//function handleProfileFormSubmit(evt) {
// evt.preventDefault();

//profileName.textContent = nameInput.value;
// profileJob.textContent = jobInput.value;

// closePopup(profilePopup);
//}

//profileFormElement.addEventListener("submit", handleProfileFormSubmit);

/*-----------------------------------------------------------------------//
                                Add cards
------------------------------------------------------------------------*/
const addCardPopup = document.querySelector(".popup_type_card");
const addCardOpenBtn = document.querySelector(".profile__button");

const cardTitleInput = addCardPopup.querySelector(".popup__input_type_title");
const cardLinkInput = addCardPopup.querySelector(".popup__input_type_link");

addCardOpenBtn.addEventListener("click", function () {
  cardTitleInput.value = "";
  cardLinkInput.value = "";
  addCardFormValidator.resetValidation();

  openPopup(addCardPopup);
});

addCardPopup.addEventListener("click", function (evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(addCardPopup);
  }
});

//function handleEditFormElSubmit(evt) {
//evt.preventDefault();
//const cardInput = { name: cardTitleInput.value, link: cardLinkInput.value };
//const cardElement = generateCard(cardInput);
//evt.target.reset();
//imageCards.prepend(cardElement);
//closePopup(addCardPopup);
//}

//addCardFormElement.addEventListener("submit", handleEditFormElSubmit);

//------------------------------------------------------------------------//
//                      initialCards                                      //
//------------------------------------------------------------------------//

const imageCards = document.querySelector(".cards");
const cardTemplate = document
  .querySelector(".card-template")
  .content.querySelector(".cards__card");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function handlerCardClick(name, link) {
  openPopup(previewPopup);
  previewPopupImageElement.src = link;
  previewPopupImageElement.alt = "photo of" + name;
  previewPopupTitle.textContent = name;
}

function generateCard(card) {
  const cardElement = new Card(card, cardTemplateSelector, handlerCardClick);
  return cardElement.generateCard();
}
/* previewPopup.addEventListener("click", function (evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(previewPopup);
  }
});*/

const cardTemplateSelector = ".card-template";

initialCards.forEach(function (cardData) {
  imageCards.append(generateCard(cardData));
});
