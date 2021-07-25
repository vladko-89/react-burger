import { BASE_URL } from './constants';
import { getResponse } from './utils';

class Api {
  constructor() {
    this._base_url = BASE_URL;
  }

  getIngredients() {
    return fetch(`${this._base_url}`, {
      method: 'GET',
      header: {
        'Content-type': 'application/json'
      },
    })
    .then(getResponse);
  }
}

const api = new Api();

export default api;