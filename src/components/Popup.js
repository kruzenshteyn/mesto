export default class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //private
  _handleEscClose(event){
    if(event.key === 'Escape'){
      event.preventDefault();
      this.close();
    }
  }

  //public
  open(){
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleClosePopupOverlay(e){
		if(e.target.classList.contains('popup')) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      this.close();
    }
	}

  setEventListeners(){
    //overlay close
    this._popup.addEventListener('mousedown', (event)=>this._handleClosePopupOverlay(event));
    //button close
    this._popup.querySelector('.popup__close').addEventListener('click', ()=>this.close());
  }

}
