export class Card {
  constructor(
    { name, link, likes, owner, _id },
    templateCardSelector,
    handlerCardClick,
    handleDeleteCard,
    isOwner,
    handleLikeButton,
    userInfo
  ) {
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._cardId = _id;
    this._templateCardSelector = templateCardSelector;
    this._handlerCardClick = handlerCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeButton = handleLikeButton;
    this._userInfo = userInfo;
    if (!likes) {
      this._likes = [];
    } else {
      this._likes = likes;
    }
    this._isOwnerCheck = isOwner;

    this._cardTemplate = document
      .querySelector(templateCardSelector)
      .content.querySelector(".cards__card");
  }

  _updateNumberOfLIkes = () => {
    this._cardElement.querySelector(".cards__number-of-likes").textContent =
      this._likes.length;
  };

  _setEventListeners = () => {
    const likeButton = this._cardElement.querySelector(".cards__button-like");
    const trashButton = this._cardElement.querySelector(".cards__button-trash");
    const cardImageEl = this._cardElement.querySelector(".cards__image");

    cardImageEl.style.backgroundImage = `url(${this._link})`;
    this._cardElement.querySelector(".cards__title").textContent = this._name;
    this._updateNumberOfLIkes();
    const index = this._likes.findIndex((l) => l._id === this._userInfo._id);
    if (index > -1)
      likeButton.classList.toggle("cards__button-like_active");

  
    likeButton.addEventListener("click", (e) => {
      this._handleLikeButton(this._likes, this._cardId, e.target, this._updateNumberOfLIkes);
    
    });

   
    const trashIcon = this._cardElement.querySelector(".cards__button-trash");
    if (!this._isOwnerCheck(this._owner)) {
      trashIcon.style.visibility = "hidden";
    }

    trashButton.addEventListener("click", (evt) => {
      const deleteSpecific = () => {
        const deleteCard = evt.target.closest(".cards__card");
        deleteCard.remove();
      };
      this._handleDeleteCard(deleteSpecific, this._cardId);
    });

    cardImageEl.addEventListener("click", () => {
      this._handlerCardClick(this._name, this._link);
    });
  };

  generateCard = () => {
    this._cardElement = this._cardTemplate.cloneNode(true);

    this._setEventListeners();

    return this._cardElement;
  };
}
