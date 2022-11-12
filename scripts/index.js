/*-----------------------------------------------------------------------//
                                edit profile
------------------------------------------------------------------------*/
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_profile");
const previewPopup = document.querySelector(".popup_type_preview");
const previewPopupImageElement = document.querySelector(
  ".popup__preview-image"
);
const profileFormElement = document.querySelector(".popup__form_type_profile");

const previewCloseButton = document.querySelector(".popup__close_type_btn");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_profession");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
//-------------------------------------------------------------------------//

function openPopup(popup) {
  popup.classList.add("popup_opened");
  
}

profileEditButton.addEventListener("click", function () {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  
});

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

profilePopup.addEventListener("click", function (evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(profilePopup);
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
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
const addCardCloseBtn = addCardPopup.querySelector(".popup__close");
const addCardOpenBtn = document.querySelector(".profile__button");
const editFormEl = document.querySelector(".popup__form_type_card");

const cardTitleInput = addCardPopup.querySelector(".popup__input_type_title");
const cardLinkInput = addCardPopup.querySelector(".popup__input_type_link");

const cardTitleEl = document.querySelector(".cards__title");
const cardImageEl = document.querySelector(".cards__image");

addCardOpenBtn.addEventListener("click", function () {
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

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
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

editFormEl.addEventListener("submit", handleEditFormElSubmit);

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

  cardElement.querySelector(".cards__title").textContent = card.name;

  const likeButton = cardElement.querySelector(".cards__button-like");
  likeButton.addEventListener("click", (e) => {
    e.target.classList.toggle("cards__button-like_active");
  });

  const trashButton = cardElement.querySelector(".cards__button-trash");

  trashButton.addEventListener("click", function (evt) {
    const deleteCard = evt.target.closest(".cards__card");

    deleteCard.remove();
  });

  const cardImageEl = cardElement.querySelector(".cards__image");
  const previewPopupTitle = document.querySelector(".popup__preview-title");

  cardImageEl.style.backgroundImage = `url(${card.link})`;
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
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePopup(previewPopup);
  }
});

function renderCard(card, container) {
  container.append(card);
}

initialCards.forEach(function (card) {
  const newCard = generateCard(card);
  renderCard(newCard, imageCards);
});
