import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
import axios from 'axios';

export const signupUser = createAsyncThunk('user/signupUser', async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3000/users', user);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});

// export const setToken = (token) => (dispatch) => {
//   // Dispatch the action to set the token in the Redux state
//   dispatch(userSlice.actions.setToken(token));
// };

export const loginUser = createAsyncThunk('user/loginUser', async (data) => {
  const response = await axios.post('http://localhost:3000/login', data);
  const authorizationHeader = response.headers.authorization;
  const userData = response.data.status.data.user;

  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1]; // Assuming it's a 'Bearer' token

    console.log(token);
  }
  console.log(userData);
  return response.data; // You can return any data sent from the server upon successful login.
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    // setToken: (state, action) => {
    //   state.token = action.payload;
    // },

    logout: (state) => {
      state.user = '';
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.data;
        state.error = action.payload.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        action.error.message = 'This username already exists, kindly choose another one.';
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = true;
        state.user = action.payload.data;
        // state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
