/*-----------------------------------------------------------------------//
                                edit profile
------------------------------------------------------------------------*/
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_profile");
const previewPopup = document.querySelector(".popup_type_preview");
const previewPopupImageElement = document.querySelector(".popup__preview-image");
const profileFormElement = document.querySelector(".popup__form_type_profile");

const previewCloseButton = document.querySelector(".popup_preview_type_btn")

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_profession");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
//-------------------------------------------------------------------------

profileEditButton.addEventListener("click", function () {
  profilePopup.classList.add("popup_opened");

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

profilePopup.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("popup") ||
    event.target.classList.contains("popup__close")
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
const addCardCloseBtn = addCardPopup.querySelector(".popup__close");
const addCardOpenBtn = document.querySelector(".profile__button");
const editFormEl = document.querySelector(".popup__form_type_card");

const cardTitleInput = addCardPopup.querySelector(".popup__input_type_title");
const cardLinkInput = addCardPopup.querySelector(".popup__input_type_link");

const cardTitleEl = document.querySelector(".cards__title");
const cardImageEl = document.querySelector(".cards__image");

addCardOpenBtn.addEventListener("click", function () {
  addCardPopup.classList.add("popup_opened");
});
addCardCloseBtn.addEventListener("click", function () {
  addCardPopup.classList.remove("popup_opened");
});

function handleEditFormElSubmit(evt) {
  evt.preventDefault();
  const cardInput = {name: cardTitleInput.value, link: cardLinkInput.value};
  const cardElement = generateCard(cardInput);

 imageCards.prepend(cardElement);
 addCardPopup.classList.remove("popup_opened");

 const firstTrashButton = document.querySelector(".cards__button-trash");


firstTrashButton.addEventListener("click", function(evt){
  const deleteCard = evt.target.closest(".cards__card");

 deleteCard.remove();
});

 const firstButton = document.querySelector(".cards__button-like");
  firstButton.addEventListener("click", (e) =>{
  e.target.classList.toggle("cards__button-like_active");
  });

  
};

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
  
  const cardImageEl = cardElement.querySelector(".cards__image");

  cardImageEl.style.backgroundImage = `url(${card.link})`;
  cardImageEl.addEventListener("click", function(){
    previewPopup.classList.add("popup_opened");
    previewPopupImageElement.src = card.link;
    const previewPopupTitle = document.querySelector(".popup__preview-title");
    previewPopupTitle.textContent = card.name;
  });
  return cardElement;
  
}

previewCloseButton.addEventListener("click", function(){
  previewPopup.classList.remove("popup_opened");
 
 
});

  
function renderCard(card, container) {
  container.append(card);

}


initialCards.forEach(function (card) {
  const newCard = generateCard(card);
  renderCard(newCard, imageCards);

});

//----------------Like button---------------------------------------------------------------//

const likeButtons = document.querySelectorAll(".cards__button-like");

for(let i = 0; i < likeButtons.length; i++){
  likeButtons[i].addEventListener("click", function(){
likeButtons[i].classList.toggle("cards__button-like_active");
  });
}


//---------------------------------remove card---------------------------------------//
const firstTrashButton = document.querySelector(".cards__button-trash");


firstTrashButton.addEventListener("click", function(evt){
  const deleteCard = evt.target.closest(".cards__card");

 deleteCard.remove();
});

const trashButtons =  document.querySelectorAll(".cards__button-trash");

for(let index = 0; index < trashButtons.length; index++){
  trashButtons[index].addEventListener("click", function(evt){
    const deleteCard = evt.target.closest(".cards__card");
deleteCard.remove();
  });
}

