import axios from 'axios'
import {AUTH_TOKEN, BASE_API_URL} from './const.js'

export const publicRequester = axios.create({
  baseURL: BASE_API_URL,
})

/* This is for authorized JSON requests */
const requester = axios.create({
  baseURL: BASE_API_URL,
});
requester.interceptors.request.use((config) => {
  const tokenData = JSON.parse(localStorage.getItem(AUTH_TOKEN))
  if (tokenData) {
    config.headers["Authorization"] = `Bearer ${tokenData.access_token}`
  }
  return config;
})
requester.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (localStorage.getItem(AUTH_TOKEN)) {
        if (error.response?.status === 401) {
          const tokenData = JSON.parse(localStorage.getItem(AUTH_TOKEN));
          console.log(tokenData)
          localStorage.removeItem(AUTH_TOKEN)
          // const payload = {
          //   refresh_token: tokenData.refresh_token,
          // };
          //
          // await requester.post(REFRESH, payload).then(response => {
          //   console.log(response)
          //
          //   // localStorage.setItem(AUTH_TOKEN, JSON.stringify(response.data));
          // })
          //
          // return requester(error.config);
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
});



export default requester