import "./index.css";
import { Card } from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import  PopupWithSubmit  from "../components/PopupWithSubmit.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { settings } from "../utils/constants.js";
import { api } from "../components/Api";

api.getInitialCards().then((res) => {
  const section = new Section(
    {
      items: res,
      renderer: (data) => {
        section.appendItem(generateCard(data));
      },
    },
    ".cards"
  );

  section.render();
});

api.getUserInfo().then((res) => {
  userInfo.setUserInfo(res);
});

const cardTemplateSelector = ".card-template";

function generateCard(card) {
  const cardElement = new Card(card, cardTemplateSelector, handleCardClick, handleDeleteCard);
  return cardElement.generateCard();
}

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__subtitle",
});

const imageModal = new PopupWithImage(".popup_type_preview");
imageModal.setEventListeners();

const deleteModal = new PopupWithSubmit(".popup_type_delete-card");
deleteModal.setEventListeners();

const editModal = new PopupWithForm(".popup_type_profile", (data) =>
  userInfo.setUserInfo(data)
);

editModal.setEventListeners();

const addCardModal = new PopupWithForm(".popup_type_card", (data) => {
  api.createCard(data).then((res) => {
    const section = new Section(
      {
        items: [],
        renderer: (data) => {
          section.appendItem(generateCard(data));
        },
      },
      ".cards"
    );
    handleDeleteCard; () => {
      console.log("123")
    }

    const cardElement = generateCard(res);
    section.addItem(cardElement);
    section.render();
  });
});

addCardModal.setEventListeners();

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

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_profession");

//-------------------------------------------------------------------------//

profileEditButton.addEventListener("click", function () {
  const data = userInfo.getUserInfo();
  editModal.open();
  editFormValidator.resetValidation();
  nameInput.value = data.name;
  jobInput.value = data.job;
});

/*-----------------------------------------------------------------------//
                                Add cards
------------------------------------------------------------------------*/

const addCardOpenBtn = document.querySelector(".profile__button");

addCardOpenBtn.addEventListener("click", function () {
  addCardModal.open();
  addCardFormValidator.resetValidation();
});

function handleCardClick(name, link) {
  imageModal.open(name, link);
}

function handleDeleteCard(deleteSpecific){
  deleteModal.setAction(deleteSpecific);
  deleteModal.open();
}