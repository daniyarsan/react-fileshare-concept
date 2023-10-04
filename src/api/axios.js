import axios from 'axios'
import {AUTH_TOKEN, BASE_API_URL, REFRESH} from './const.js'

export const publicRequester = axios.create({
  baseURL: BASE_API_URL,
})

const requester = axios.create({
  baseURL: BASE_API_URL,
})


requester.interceptors.request.use((config) => {
  const tokenData = JSON.parse(localStorage.getItem(AUTH_TOKEN))
  if (tokenData) {
    config.headers["Authorization"] = `Bearer ${tokenData.access_token}`
  }
  return config
})

requester.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      if (localStorage.getItem(AUTH_TOKEN)) {
        if (error.response?.status > 400 && error.response?.status < 499) {
          const {refresh_token} = JSON.parse(localStorage.getItem(AUTH_TOKEN))
          const axiosInstance = axios.create({
            baseURL: BASE_API_URL,
            headers: {Authorization: `Bearer ${refresh_token}`}
          })
          axiosInstance.post(REFRESH, {}).then(({data}) => {
            localStorage.setItem(AUTH_TOKEN, JSON.stringify({refresh_token, access_token: data.token}));
          }).catch((err) => {
            // console.log(err)
          });

          // return axiosInstance(error.config);
        } else {
          return Promise.reject(error);
        }
      }

      return error.response
    }
)


/* This is for authorized MULTIPART FORM DATA requests (FILE UPLOADS) */
export const multipartRequester = axios.create({
  baseURL: BASE_API_URL,
})
multipartRequester.interceptors.request.use((config) => {
  const tokenData = JSON.parse(localStorage.getItem(AUTH_TOKEN));
  if (tokenData) {
    config.headers["Authorization"] = `Bearer ${tokenData.access_token}`
    config.headers["Content-Type"] = 'multipart/form-data'
  }
  return config;
})


multipartRequester.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      if (localStorage.getItem(AUTH_TOKEN)) {
        if (error.response?.status > 400 && error.response?.status < 499) {
          const {refresh_token} = JSON.parse(localStorage.getItem(AUTH_TOKEN))
          const axiosInstance = axios.create({
            baseURL: BASE_API_URL,
            headers: {Authorization: `Bearer ${refresh_token}`}
          })
          axiosInstance.post(REFRESH, {}).then(({data}) => {
            localStorage.setItem(AUTH_TOKEN, JSON.stringify({refresh_token, access_token: data.token}));
          }).catch((err) => {
            // console.log(err)
          });

          // return axiosInstance(error.config);
        } else {
          return Promise.reject(error);
        }
      }

      return error.response
    }
)

export default requester