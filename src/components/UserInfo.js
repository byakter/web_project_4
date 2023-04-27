

export class UserInfo  {
  // constructor({ profileNameSelector, profileJobSelector, _id }) {
  //   this._profileName = document.querySelector(profileNameSelector);
  //   this._profileJob = document.querySelector(profileJobSelector);
  //   this._id = _id;
    
  // }
  

  constructor({ profileNameSelector, profileJobSelector, avatarSelector, _id }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
    this._profileImage = document.querySelector(avatarSelector);
    this._id = _id;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
      _id: this._id,
    };
  }

  setUserInfo({ name, about, _id}) {
    this._id = _id;
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
    // if (avatar){
    //   const profileImage = document.querySelector(".profile__image");
    //   profileImage.src = avatar;
    // }
    

  }
  setAvatar(avatar){
    this._profileImage.src=avatar;
  }
}
