export default class Api{
  constructor(param){
    this._baseUrl = param.baseUrl;
    this._cards = this._baseUrl + 'cards';
    this._profile = this._baseUrl + 'users/me';
    this._avatar = this._baseUrl + 'users/me/avatar';
    this._likes = this._baseUrl + 'cards/likes';
    this._headers = param.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfile(){
    return fetch(this._profile, {
      method: "GET",
      headers: this._headers
    })
    .then(this._checkResponse);;
  }

  patchUserInfo(name, about) {
    return fetch(this._profile, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse);;
  }

  patchAvatar(link) {
    return fetch(this._avatar, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(this._checkResponse);
  }

  getInitialCards(){
    return fetch(this._cards, {
      method: "GET",
      headers: this._headers
    })
    .then(this._checkResponse);;
  }

  postCard(name, link) {
    //console.log(`name:${name}\nlink:${link}`)
    return fetch(this._cards, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name:name,
        link: link
      })
    })
    .then(this._checkResponse);;
  }

  deleteCard(_id) {
    return fetch(`${this._cards}/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  putLike(_id, method) {
    return fetch(`${this._likes}/${_id}`, {
            method: method,
            headers: this._headers
        })
        .then(this._checkResponse);
  }
}
