class MainApi {
   constructor(config) {
      this._url = config.url;
      this._headers = config.headers
   }

   #onResponce(res) {
      return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData));
   }

   getUserInfo() {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}/users/me`, {
         method: "GET",
         headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
         },
      })
         .then(this.#onResponce)
   }

   editUserInfo(name, email) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email })
      })
        .then(this.#onResponce)
    }
}

const mainApi = new MainApi({
   url: 'https://api.diploma-nik.nomoredomainsmonster.ru',
   headers: {
      'content-type': 'application/json',
   }
});

export default mainApi;