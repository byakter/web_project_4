import "./index.css";
import { Card } from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { settings } from "../utils/constants.js";
import { api } from "../components/Api";

const section = new Section(
  {
    items: [],
    renderer: (data) => {
      section.appendItem(generateCard(data));
    },
  },
  ".cards"
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    const data = {
      user: userData,
      cards: cards,
    };

    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);
    section.items = cards;
    section.render();
  })
  .catch((err) => {
    console.error(err);
  });

const isOwner = (owner) => {
  return userInfo.getUserInfo()._id === owner._id;
};

function generateCard(card) {
  const cardElement = new Card(
    card,
    settings.cardTemplateSelector,
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
  avatarSelector: ".profile__image",
});

const imageModal = new PopupWithImage(".popup_type_preview");
imageModal.setEventListeners();

const deleteModal = new PopupWithSubmit(".popup_type_delete-card");
deleteModal.setEventListeners();
deleteModal.close();

const editModal = new PopupWithForm(".popup_type_profile", (data) => {
  api
    .setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      editModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editModal.saving(false);
    });
});

editModal.setEventListeners();

const editProfileImage = new PopupWithForm(".popup_type_avatar", (data) => {
  api
    .changeProfileImage({ avatar: data.avatar })
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      editProfileImage.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfileImage.saving(false);
    });
});
editProfileImage.setEventListeners();

const addCardModal = new PopupWithForm(".popup_type_card", (data) => {
  api
    .createCard(data)
    .then((res) => {
      addCardModal.close();

      const cardElement = generateCard(res);
      section.addItem(cardElement);
    })
    .catch((err) => {
      alert("Unknow error please try again");
      console.error(err);
    })
    .finally(() => {
      addCardModal.saving(false);
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
}

function handleDeleteCard(deleteSpecific, cardId) {
  deleteModal.setAction(() => {
    api
      .deleteCard(cardId)
      .then((res) => {
        deleteSpecific();
        deleteModal.close();
      })
      .catch((err) => {
        alert("Unknow error please try again");
        console.error(err);
      });
  });

  deleteModal.open();
}

function handleLikeButton(likes, cardId, updateNumberOfLIkes) {
  const index = likes.findIndex((l) => l._id === userInfo._id);

  if (index === -1) {
    api
      .addLike(cardId)
      .then((res) => {
        likes.push(userInfo);
        updateNumberOfLIkes();
      })
      .catch((err) => {
        alert("Unknow error please try again");
        console.error(err);
      });
  } else {
    api
      .deleteLike(cardId)
      .then((res) => {
        likes.splice(index, 1);
        updateNumberOfLIkes();
      })
      .catch((err) => {
        alert("Unknow error please try again");
        console.error(err);
      });
  }
}
