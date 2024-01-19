class MainApi {
   constructor(config) {
      this._url = config.url;
      this._headers = config.headers
   }

   #onResponce(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    }

   getUserInfo() {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}/users/me`, {
         method: 'GET',
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
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({ name, email })
      })
         .then(this.#onResponce)
   }

   getMovies() {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}/movies`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
         },
      })
         .then(this.#onResponce)
   }

   saveMovie(data) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}/movies`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
            country: data.country,
            director: data.director,
            duration: data.duration,
            year: data.year,
            description: data.description,
            image: 'https://api.nomoreparties.co' + data.image.url,
            trailerLink: data.trailerLink,
            thumbnail: 'https://api.nomoreparties.co' + data.image.formats.thumbnail.url,
            movieId: data.id,
            nameRU: data.nameRU,
            nameEN: data.nameEN,
         }),
      })
         .then(this.#onResponce);
   }

   deleteMovie(movieId) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}/movies/${movieId}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
         },
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