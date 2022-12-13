import { Card } from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup } from "./utils.js";

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
const previewPopup = document.querySelector(".popup_type_preview");
const previewPopupImageElement = document.querySelector(
  ".popup__preview-image"
);


//const previewCloseButton = document.querySelector(".popup__close_type_btn");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_profession");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");


//-------------------------------------------------------------------------//
function closeByEscape(evt){
  if (evt.key === "Escape"){
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

profileEditButton.addEventListener("click", function () {
  editFormValidator.resetValidation()
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  
});

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);

}

profilePopup.addEventListener("click", function (evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(profilePopup);
  }
});


function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(profilePopup);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

/*-----------------------------------------------------------------------//
                                Add cards
------------------------------------------------------------------------*/
const addCardPopup = document.querySelector(".popup_type_card");
//const addCardCloseBtn = addCardPopup.querySelector(".popup__close");
const addCardOpenBtn = document.querySelector(".profile__button");


const cardTitleInput = addCardPopup.querySelector(".popup__input_type_title");
const cardLinkInput = addCardPopup.querySelector(".popup__input_type_link");


addCardOpenBtn.addEventListener("click", function () {
  cardTitleInput.value = "";
  cardLinkInput.value = "";
  addCardFormValidator.resetValidation()

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



function handleEditFormElSubmit(evt) {
  
  evt.preventDefault();
  const cardInput = { name: cardTitleInput.value, link: cardLinkInput.value };
  const cardElement = generateCard(cardInput);
  evt.target.reset();
  imageCards.prepend(cardElement);
  closePopup(addCardPopup);
}

addCardFormElement.addEventListener("submit", handleEditFormElSubmit);

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

function generateCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector(".cards__button-like");
  const trashButton = cardElement.querySelector(".cards__button-trash");
  const cardImageEl = cardElement.querySelector(".cards__image");

  cardImageEl.style.backgroundImage = `url(${card.link})`;
  cardElement.querySelector(".cards__title").textContent = card.name;

  
  likeButton.addEventListener("click", (e) => {
    e.target.classList.toggle("cards__button-like_active");
  });

  

  trashButton.addEventListener("click", function (evt) {
    const deleteCard = evt.target.closest(".cards__card");

    deleteCard.remove();
  });

  
  const previewPopupTitle = document.querySelector(".popup__preview-title");

  
  cardImageEl.addEventListener("click", function () {
    openPopup(previewPopup);
    previewPopupImageElement.src = card.link;
    previewPopupImageElement.alt = "photo of" + card.name;
    previewPopupTitle.textContent = card.name;
  });
  return cardElement;
}

previewPopup.addEventListener("click", function (evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(previewPopup);
  }
});

const cardTemplateSelector = ".card-template";

function renderCard(card, container) {
  const cardElement = new Card (card, cardTemplateSelector)
  console.log(card);
  container.append(cardElement.generateCard());
}

initialCards.forEach(function (cardData) {
  
  renderCard(cardData, imageCards);
});
