import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector, popupImageLinkSelector, popupImageTitleSelector){
    super(popupSelector);
    this._popupImageLink = this._popup.querySelector(popupImageLinkSelector);
    this._popupImageTitle = this._popup.querySelector(popupImageTitleSelector);
  }

  open(link, about){
    this._popupImageTitle.textContent = about;
    this._popupImageLink.src = link;
    this._popupImageLink.alt = about;
    super.open();
  }

}
