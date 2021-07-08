import axios from 'axios';
import config from '../config/apiConfig';

class Api {

  constructor(config) {
    this.url   = config.url;
    this.token = config.token;
  }

  async accounts() {
    try {

      const config = {
        headers: { 'accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
      };

      const response = await axios.get(`${this.url}/user/accounts`,config);
      return response.data;
    } catch (err) {
      console.log("Ошибка" + err);
      return Promise.reject(err);
    }
  }

}

const api = new Api(config);

export default api;