import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {AUTH_TOKEN, LOGIN_URL, REGISTER_URL} from "../../api/const.js";
import requester from "../../api/axios.js";
import {toast} from "react-toastify";

const initialState = {
  userData: {},
  isAuth: false,
  token: null,
  isLoading: false
}

export const login = createAsyncThunk('user/login', async (data, thunkAPI) => {
  try {
    const response = await requester.post(LOGIN_URL, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response?.data

  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data)
  }
})

export const registration = createAsyncThunk('user/registration', async (data, thunkAPI) => {
  try {
    const response = await requester.post(REGISTER_URL, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = response?.data

    if (response.status < 200 || response.status >= 300) {
      return thunkAPI.rejectWithValue(result)
    }

    return response?.data

  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data)
  }

})

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    logout() {
      localStorage.removeItem(AUTH_TOKEN)
      return initialState
    }
  },

  extraReducers: (builder) => {
    builder
        .addCase(login.pending, (state) => {
          state.loading = true
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false
          state.isAuth = true
          const token = action.payload?.token
          state.token = token
          state.userData.name = 'test user'
          localStorage.setItem(AUTH_TOKEN, JSON.stringify(token))
        })

        .addCase(login.rejected, (state, {payload}) => {
          state.loading = false
          toast.error(payload?.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
          })
        })

        /************/
        .addCase(registration.pending, (state) => {
          state.loading = true
        })
        .addCase(registration.fulfilled, (state, action) => {
          console.log(action)
          state.loading = false
        })

        .addCase(registration.rejected, (state, {payload}) => {
          state.loading = false
          toast.error(payload?.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
          })
        })
  }
})

export const {logout} = userSlice.actions

export default userSlice.reducer
