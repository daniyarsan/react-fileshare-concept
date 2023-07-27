import axios from 'axios'
import {AUTH_TOKEN, BASE_API_URL, REFRESH} from './const.js'

const requester = axios.create({
  baseURL: BASE_API_URL,
});

export const publicRequester = axios.create({
  baseURL: BASE_API_URL,
})

requester.interceptors.request.use((config) => {
  const tokenData = JSON.parse(localStorage.getItem(AUTH_TOKEN))

  if (tokenData) {
    config.headers["Authorization"] = `Bearer ${tokenData.access_token}`
  }

  return config;
})


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
);

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