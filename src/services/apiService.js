import axios from 'axios';
import config from '../config/apiConfig';

class Api {

  constructor(config) {
    this.url   = config.url;
    this.headers = { 'accept': 'application/json',
      'Authorization': `Bearer ${config.token}`
    };
  }

  async accounts() {
    try {
      const response = await axios.get(`${this.url}/user/accounts`, {  'headers': this.headers} );
      return response.data;
    } catch (err) {
      console.log("Ошибка" + err);
      return Promise.reject(err);
    }
  }

  async operations(){
    try {

      const params = {
        'from': new Date('2018-01-01'),
        'to': new Date('2021-12-01'),
        'brokerAccountId': '2019469606'
      }

      const response = await axios.get(`${this.url}/operations`, {  'headers': this.headers, params} );
      return response.data;
    } catch (err) {
      console.log("Ошибка" + err);
      return Promise.reject(err);
    }
  }

}

const api = new Api(config);

export default api;