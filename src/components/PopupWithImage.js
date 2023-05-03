import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(text, link) {
    const caption = this._popup.querySelector(".popup__preview-title");
    const image = this._popup.querySelector(".popup__preview-image");

    caption.textContent = text;
    image.src = link;
    image.alt = "Image of selected tile";

    super.open();
  }
}
