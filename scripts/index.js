const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_profile');
 
const profileFormElement = document.querySelector('.popup__form_type_profile');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

profileEditButton.addEventListener('click', function(){
   profilePopup.classList.add('popup_opened')

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

function closePopup(popup) {
    popup.classList.remove('popup_opened')
}
 
profilePopup.addEventListener('click', function(event){
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
     closePopup(profilePopup)

}
})

function handleProfileFormSubmit(evt) {
   evt.preventDefault();

 profileName.textContent = nameInput.value;
 profileJob.textContent = jobInput.value;

 closePopup(profilePopup)
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);