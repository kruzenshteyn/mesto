export default class UserInfo{
  constructor(data){
    this._about = data.about;
    this._name = data.name;
    this._avatar = data.avatar;
    this._id = data._id;
  }

  getUserInfo(){
    return ({name:this._name.textContent, about: this._about.textContent});
  }

  getId(){
    return this._id;
  }

  setUserInfo(info){
    this._name.textContent = info.name;
    this._about.textContent = info.about;
    this.setUserAvatar(info.avatar);
    this._id = info._id;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
