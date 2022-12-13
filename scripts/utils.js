export const previewPopup = document.querySelector(".popup_type_preview");
export const previewPopupImageElement = document.querySelector(
  ".popup__preview-image"
);
export const previewPopupTitle = document.querySelector(".popup__preview-title"); 

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}
function closeByEscape(evt){
  if (evt.key === "Escape"){
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
 function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);

}
