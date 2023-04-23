import "./index.css";
import { Card } from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import PopupChangeProfileImage from "../components/PopupChangeProfileImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { settings } from "../utils/constants.js";
import { api } from "../components/Api";
import { data } from "autoprefixer";

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

const isOwner = (owner) => {
  return userInfo.getUserInfo()._id === owner._id;
};

// Promise.all([api.getInitialCards(), api.getUserInfo()])
// .then(([cardData, userData])=>{
//   cardList.renderItems(cardData);

//   userInfo.setUserInfo({userName: userData.name, userDescrpition: userData.about});
// })

// const cardList = new Section({
//   renderer: (data) => {
//     createCard(data)
//   }
// }
// )

const cardTemplateSelector = ".card-template";

function generateCard(card) {
  const cardElement = new Card(
    card,
    cardTemplateSelector,
    handleCardClick,
    handleDeleteCard,
    isOwner,
    handleLikeButton,
    userInfo
  );
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

const editModal = new PopupWithForm(".popup_type_profile", (data) => {
  
  userInfo.setUserInfo(data);
  editModal.close();
});

editModal.setEventListeners();

const editProfileImage = new PopupChangeProfileImage(
  ".popup_type_avatar",
  (data) => {
    
    api.changeProfileImage(data).then((res) => {
      const profileImage = document.querySelector(".profile__image");
      profileImage.src = res.avatar;

      editProfileImage.close();
    });
  }
);
editProfileImage.setEventListeners();

const addCardModal = new PopupWithForm(".popup_type_card", (data) => {
  api.createCard(data).then((res) => {
    addCardModal.close();
    const section = new Section(
      {
        items: [],
        renderer: (data) => {
          section.appendItem(generateCard(data));
        },
      },
      ".cards"
    );
    handleDeleteCard;
    () => {};

    const cardElement = generateCard(res);
    section.addItem(cardElement);
    section.render();
  });
});

addCardModal.setEventListeners();

const profileFormElement = document.querySelector(".popup__form_type_profile");
const addCardFormElement = document.querySelector(".popup__form_type_card");
const profileImageFormElemnt = document.querySelector(
  ".popup__form_type_avatar"
);

const editFormValidator = new FormValidator(settings, profileFormElement);
const addCardFormValidator = new FormValidator(settings, addCardFormElement);
const profileImageFormValidator = new FormValidator(
  settings,
  profileImageFormElemnt
);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
profileImageFormValidator.enableValidation();

const profileEditButton = document.querySelector(".profile__edit-button");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_profession");

profileEditButton.addEventListener("click", function () {
  const data = userInfo.getUserInfo();
  editModal.open();
  editFormValidator.resetValidation();
  nameInput.value = data.name;
  jobInput.value = data.job;
});

const addCardOpenBtn = document.querySelector(".profile__button");

addCardOpenBtn.addEventListener("click", function () {
  addCardModal.open();
  addCardFormValidator.resetValidation();
});

const editProfileImageBtn = document.querySelector(".profile__image-button");

editProfileImageBtn.addEventListener("click", function () {
  editProfileImage.open();
  profileImageFormValidator.resetValidation();
});

function handleCardClick(name, link) {
  imageModal.open(name, link);
  editProfileImage.open(link);
}

function handleDeleteCard(deleteSpecific) {
  deleteModal.setAction(deleteSpecific);
  deleteModal.open();
}

function handleLikeButton(likes, cardId) {
  const index = likes.findIndex((l) => l._id === userInfo._id);

  if (index === -1) {
    api.addLike(cardId);
    likes.push(userInfo);
  } else {
    api.deleteLike(cardId);
    likes.splice(index, 1);
  }
}

// const saveButton = document.getElementById("save-button");
// const saveButtonText = saveButton.textContent;

// document.forms["profile-form"].addEventListener("submit", (event) => {
//   event.preventDefault();
//   saveButton.textContent = "Saving...";

//   setTimeout(() => {
//     saveButton.textContent = saveButtonText;
//   }, 3000);
// });
