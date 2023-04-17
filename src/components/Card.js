
export class Card {
  constructor({ name, link, likes }, templateCardSelector, handlerCardClick, handleDeleteCard) {
    this._name = name;
    this._link = link;
    this._templateCardSelector = templateCardSelector;
    this._handlerCardClick = handlerCardClick; 
    this._handleDeleteCard = handleDeleteCard; 
    this._likes = likes;
    

    this._cardTemplate = document
      .querySelector(templateCardSelector)
      .content.querySelector(".cards__card");

  
  }

  _handleLikeButton = (e) => {
    e.target.classList.toggle("cards__button-like_active");
  };

  // _handleDeleteCard = (e) => {
  //   const deleteCard = e.target.closest(".cards__card"); 
  //   deleteCard.remove();
  // }


  _setEventListeners = () => {
    const likeButton = this._cardElement.querySelector(".cards__button-like");
    const trashButton = this._cardElement.querySelector(".cards__button-trash");
    const cardImageEl = this._cardElement.querySelector(".cards__image");

    cardImageEl.style.backgroundImage = `url(${this._link})`;
    this._cardElement.querySelector(".cards__title").textContent = this._name;
    this._cardElement.querySelector(".cards__number-of-likes").textContent = this._likes.length;

    likeButton.addEventListener("click", this._handleLikeButton);
    
    // trashButton.addEventListener("click", this._handleDeleteCard);
    // const trashIcon = this._cardElement.querySelector(".cards__button-trash");
    // if(false){
    //   trashIcon.style.visibility = 'hidden';
//}

    trashButton.addEventListener("click",  (evt) => {
      const deleteSpecific = () =>{
      const deleteCard = evt.target.closest(".cards__card");
      deleteCard.remove();
    }
      this._handleDeleteCard(deleteSpecific);

    });

    cardImageEl.addEventListener("click", () => {
      this._handlerCardClick(this._name, this._link);
    });
  }


  generateCard = () => {
    this._cardElement = this._cardTemplate.cloneNode(true);

   this._setEventListeners();

    return this._cardElement;
  };
}
