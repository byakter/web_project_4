const customFetch = (url, headers) =>
  fetch(url, headers)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.statusText);
    })
    // .catch((err) => console.log(err));

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
   
  }

  getInitialCards() {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }
  getUserInfo() {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      
    });

  }
  setUserInfo(data) {
    return customFetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
        method : "PATCH",
        body : JSON.stringify(data)
      });
}

changeProfileImage(data) {
    return customFetch(`${this._baseUrl}/users/me/avatar`, {
        headers: this._headers,
        method : "PATCH",
        body : JSON.stringify(data)
      });
}

  createCard(data) {
    
       return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({name: data["place-name"], link: data.link}),

    });
  }
  deleteCard(card) {
    
    return customFetch(`${this._baseUrl}/cards/${card}`, {
   headers: this._headers,
   method: "DELETE",
  

 });
}



  addLike(cardId){
    return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "PUT",
      });
}
deleteLike(cardId){
    return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "DELETE",
      });
}
}



export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "5dce2cef-3614-4677-836d-e6e3b236af3f",
    "Content-Type": "application/json",
  },
});
