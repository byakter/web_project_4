import {
  previewPopup,
  openPopup,
  previewPopupImageElement,
  previewPopupTitle,
} from "./utils.js";

export class Card {
  constructor({ name, link }, templateCardSelector) {
    this._name = name;
    this._link = link;
    this._templateCardSelector = templateCardSelector;

    this._cardTemplate = document
      .querySelector(templateCardSelector)
      .content.querySelector(".cards__card");
  }

  _handleLikeButton = (e) => {
    e.target.classList.toggle("cards__button-like_active");
  };

  generateCard = () => {
    this._cardElement = this._cardTemplate.cloneNode(true);

    const likeButton = this._cardElement.querySelector(".cards__button-like");
    const trashButton = this._cardElement.querySelector(".cards__button-trash");
    const cardImageEl = this._cardElement.querySelector(".cards__image");

    cardImageEl.style.backgroundImage = `url(${this._link})`;
    this._cardElement.querySelector(".cards__title").textContent = this._name;

    likeButton.addEventListener("click", this._handleLikeButton);

    trashButton.addEventListener("click", function (evt) {
      const deleteCard = evt.target.closest(".cards__card");

      deleteCard.remove();
    });

    cardImageEl.addEventListener("click", function () {
      openPopup(previewPopup);
      previewPopupImageElement.src = this._link;
      previewPopupImageElement.alt = "photo of" + this._name;
      previewPopupTitle.textContent = this._name;
    });

    return this._cardElement;
  };
}

/*function generateCard(card) {
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
}*/
