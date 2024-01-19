class MoviesApi {
   constructor(config) {
      this._url = config.url;
      this._headers = config.headers
   }
   #onResponce(res) {
      return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData));
   }
   
   getMovies() {
      return fetch(`${this._url}`, {
         method: "GET",
         headers: this._headers
      })
         .then(this.#onResponce)
   }
}

const moviesApi = new MoviesApi({
   url: 'https://api.nomoreparties.co/beatfilm-movies',
   headers: {
      'content-type': 'application/json',
   }
});

export default moviesApi;