import { BASE_URL } from './constants';
import { getResponse} from './utils';

class Api {
  constructor() {
    this._base_url = BASE_URL;
  }

  getIngredients() {
    return fetch(`${this._base_url}/ingredients/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
    })
    .then(getResponse);
  }

  createOrder(data) {
    return fetch(`${this._base_url}/orders/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": data
      })
    })
    .then(getResponse)
  }

  register(data) {
    return fetch(`${this._base_url}/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "name": data.name,
        "email": data.email,
        "password": data.password
      })
    })
    .then(getResponse)
  }

  login(data) {
    return fetch(`${this._base_url}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "email": data.email,
        "password": data.password
      })
    })
    .then(getResponse)
  }

  updateTokens(token) {
    return fetch(`${this._base_url}/auth/token/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "token": token
      })
    })
    .then(getResponse)
    .then(res => {
      localStorage.setItem('refresh', res.refreshToken);
      localStorage.setItem('token', res.accessToken);
    })
    .catch((err) => console.log(err.status))
  }

  logOut() {
    return fetch(`${this._base_url}/auth/logout/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "token": localStorage.getItem('refresh')
      })
    })
    .then(getResponse)
  }

  forgot(email) {
    return fetch(`${this._base_url}/password-reset/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "email": email
      })
    })
    .then(getResponse)
  }

  reset(data) {
    return fetch(`${this._base_url}/password-reset/reset/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "password": data.password,
        "token": data.code
      })
    })
    .then(getResponse)
  }

  getUserInfo() {
    return fetch(`${this._base_url}/auth/user/`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
    .then((res) => res.json())
    .then(data => data)
  }

  editUserInfo(data) {
    return fetch(`${this._base_url}/auth/user/`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "password": data.password,
        "name": data.name,
        "email": data.email
      })
    })
    .then((res) => res.json())
    .then(data => data)
  }
}



const api = new Api();

export default api;