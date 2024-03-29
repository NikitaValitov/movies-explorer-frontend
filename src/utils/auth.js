export const BASE_URL = 'https://api.diploma-nik.nomoredomainsmonster.ru';

const checkError = (res) => {
   if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

export const register = (email, password, name) => {
   return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name })
   })
   .then((res) => checkError(res));
};

export const authorize = (email, password) => {
   return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
   })
   .then((res) => checkError(res));
};

export const checkToken = (token) => {
   return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
      }
   })
   .then((res) => checkError(res));
}