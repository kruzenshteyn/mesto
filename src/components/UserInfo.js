export default class UserInfo{
  constructor(data){
    this._selectorAbout = data.about;
    this._selectorName = data.name;
  }

  getUserInfo(){
    return ({name:this._selectorName.textContent, about: this._selectorAbout.textContent});
  }

  setUserInfo(info){
    this._selectorName.textContent = info.name;
    this._selectorAbout.textContent = info.about;
  }
}
