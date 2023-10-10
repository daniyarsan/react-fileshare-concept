import requester from "../api/axios.js";

class User {

  static USER_STAT = '/user/stat'

  username
  tariff
  expiration_date
  files_cnt
  files_size

  constructor(obj = null) {
    const defaultFields = {
      "expiration_date": "",
      "files_cnt": 0,
      "files_size": 0,
      "username": "",
      "tariff": {}
    }

    if (obj) {
      Object.keys(defaultFields).forEach(key => defaultFields[key] = obj[key]);
    }
    Object.assign(this, defaultFields);
  }



  /* STATICs or ASYNCs */
  static async requestApi() {
    return await requester.get(`${this.USER_STAT}`)
  }
}

export default User