import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {AUTH_TOKEN, LOGIN, REGISTER} from "../../api/const.js";
import requester from "../../api/axios.js";
import {toast} from "react-toastify";
import User from "../../models/User.js";
import {Tariff} from "../../models/Tariff.js";

const initialState = {
  userData: {},
  isAuth: false,
  tokenData: {}
}

export const update = createAsyncThunk('user/update', async (data, thunkAPI) => {
  const response = await User.requestApi()

  if (response.status < 200 || response.status >= 300) {
    return thunkAPI.rejectWithValue(response?.data)
  }

  return response?.data
})

export const login = createAsyncThunk('user/login', async (data, thunkAPI) => {
  try {
    const response = await requester.post(LOGIN, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}})

    if (response.status < 200 || response.status >= 300) {
      return thunkAPI.rejectWithValue(response?.data)
    }
    return response?.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data)
  }
})

export const registration = createAsyncThunk('user/registration', async (data, thunkAPI) => {
  try {
    const response = await requester.post(REGISTER, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}})
    if (response.status < 200 || response.status >= 300) {
      return thunkAPI.rejectWithValue(response?.data)
    }
    return response?.data
  } catch (err) {
    // console.log(err)
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
    },

    setUserData(state, action) {
      state.userData = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
        .addCase(update.fulfilled, (state, {payload}) => {
          state.userData = payload
        })

        .addCase(login.fulfilled, (state, {payload}) => {
          localStorage.setItem(AUTH_TOKEN, JSON.stringify(payload))
          state.tokenData = payload

          state.loading = false
          state.isAuth = true
        })
        .addCase(login.rejected, (state, {payload}) => {
          state.loading = false
          toast.error(payload?.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
          })
        })
        .addCase(registration.rejected, (state, {payload}) => {
          // console.log('rejected')
          state.loading = false
          toast.error(payload?.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
          })
        })
  }
})

export const {logout, setUserData} = userSlice.actions

export default userSlice.reducer
