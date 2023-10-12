import axios from "axios";
import {AUTH_TOKEN, BASE_API_URL, REFRESH} from "../api/const.js";
import {toast} from "react-toastify";

export class Requester {

  requester
  accessToken
  refreshToken

  constructor(accessToken = false, refreshToken = false) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken

    this.requester = axios.create({
      baseURL: BASE_API_URL,
    })

    this._initRequester()
  }

  async post(url, data) {
    const headers = {}
    headers['Content-Type'] = 'application/json'

    return await this.requester.post(url, data, {headers})
  }

  async get(url) {
    return await this.requester.get(url)
  }

  async postMultipart(url, data) {
    const headers = {}
    headers['Content-Type'] =  'multipart/form-data'
    return await this.requester.post(url, data, {headers})
  }

  setToken(token) {
    this.accessToken = token
  }

  getToken() {
    return this.accessToken
  }

  _initRequester() {
    this.requester.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers["Authorization"] = `Bearer ${this.accessToken}`
      }
      return config
    })

    this.requester.interceptors.response.use(
        (response) => {return response},
        
        async (error) => {

          if (error.response.status == 401) {
            this._renewToken()
            return
          }

          toast.error(error?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
          })

          toast.error(error?.response?.data?.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
          })

          return Promise.reject(error);
        }
    )
  }


  _renewToken() {
    console.log('renewing')

    const axiosInstance = axios.create({
      baseURL: BASE_API_URL,
      headers: {Authorization: `Bearer ${this.refreshToken}`}
    })

    axiosInstance.post(REFRESH, {}).then(({data}) => {
      const user = JSON.parse(localStorage.getItem('user'))
      console.log(user)
      this.accessToken = data.token
    })
  }

}