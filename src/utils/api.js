import { BASE_URL } from './constants';
import { getResponse } from './utils';

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
    console.log(data);
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
}

const api = new Api();

export default api;