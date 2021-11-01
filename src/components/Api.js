export default class Api{
  constructor(param){
    this._cards = param.cards;
    this._profile = param.profile;
    this._avatar = param.avatar;
    this._likes = param.likes;
    this._headers = param.headers;
  }

  getProfile(){
    return fetch(this._profile, {
      method: "GET",
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  patchAvatar(link) {
    return fetch(this._avatar, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards(){
    return fetch(this._cards, {
      method: "GET",
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(_id) {
    return fetch(`${this._cards}/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  putLike(_id, method) {
    return fetch(`${this._likes}/${_id}`, {
            method: method,
            headers: this._headers
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
        });
  }
}
