export default class Popup{
  constructor(popupSelector){
    this._selector = popupSelector;
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
    this._selector.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._selector.classList.remove('popup_is-opened');
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
    this._selector.addEventListener('mousedown', (event)=>this._handleClosePopupOverlay(event));
    //button close
    this._selector.querySelector('.popup__close').addEventListener('click', ()=>this.close());
  }

}
