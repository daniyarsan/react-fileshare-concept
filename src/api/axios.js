import axios from 'axios'
import {AUTH_TOKEN, BASE_URL} from './const.js'

export const getToken = () => {
  return JSON.parse(localStorage.getItem(AUTH_TOKEN)) || ''
}
const token = getToken()

const requester = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization':`Bearer ${token}`
  }
});

requester.interceptors.request.use((req) => {
  if(token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
})

export default requester

//
// api.interceptors.request.use((config) => {
//   const tokenData = JSON.parse(localStorage.getItem(AUTH_TOKEN));
//
//   if (tokenData) {
//     config.headers["Authorization"] = `Bearer ${tokenData.token}`;
//     config.headers["Content-Type"] = 'application/json';
//   }
//
//   return config;
// });
//
// api.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async (error) => {
//       if (localStorage.getItem(AUTH_TOKEN)) {
//         if (error.response?.status === 401) {
//           console.log('refreshing')
//
//           // const tokenData = JSON.parse(localStorage.getItem(AUTH_TOKEN));
//           // const payload = {
//           //   refresh_token: tokenData.refresh_token,
//           // };
//           // await api.post(REFRESH_URL, payload).then(response => {
//           //   localStorage.setItem(AUTH_TOKEN, JSON.stringify(response.data));
//           // })
//           // // error.config.headers["Authorization"] = `bearer ${apiResponse.data.access_token}`;
//           // return api(error.config);
//         } else {
//           return Promise.reject(error);
//         }
//       }
//
//       return error.response
//     }
// );
//
// export default api;