import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector, popupImageLinkSelector, popupImageTitleSelector){
    super(popupSelector);

    this._popupImageLinkSelector = popupSelector.querySelector(popupImageLinkSelector);
    this._popupImageTitleSelector = popupSelector.querySelector(popupImageTitleSelector);
  }

  open(link, about){

    this._popupImageTitleSelector.textContent = about;
    this._popupImageLinkSelector.src = link;
    this._popupImageLinkSelector.alt = about;
    super.open();
  }

  setEventListeners(){
		super.setEventListeners();
	}

  close(){
    super.close();
  }

}
