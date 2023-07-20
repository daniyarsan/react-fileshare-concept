import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {AUTH_TOKEN, LOGIN, REGISTER} from "../../api/const.js";
import requester from "../../api/axios.js";
import {toast} from "react-toastify";

const initialState = {
  userData: {},
  isAuth: false,
  tokenData: {},
  isLoading: false
}

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
    console.log(err)
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
        .addCase(login.pending, (state) => {
          state.loading = true
        })
        .addCase(login.fulfilled, (state, action) => {
          const tokenData = action.payload
          localStorage.setItem(AUTH_TOKEN, JSON.stringify(tokenData))
          state.tokenData = tokenData
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

        /************/
        .addCase(registration.pending, (state) => {
          state.loading = true
        })
        .addCase(registration.fulfilled, (state, action) => {
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

export const {logout, setUserData} = userSlice.actions

export default userSlice.reducer
