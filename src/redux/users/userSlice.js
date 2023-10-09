import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
import axios from 'axios';

export const signupUser = createAsyncThunk('user/signupUser', async (user) => {
  try {
    console.log(user);
    const response = await axios.post(
      'https://doctors-appointment-0mkx.onrender.com/signup',
      user,
    );
    const token = response.headers.authorization.split(' ')[1]; // Extract the token from the "Bearer" header
    console.log(token);
    localStorage.removeItem('jwtToken');

    localStorage.setItem('jwtToken', token); // Save the JWT token in local storage
    console.log(localStorage.getItem('jwtToken'));

    return response.data;
  } catch (error) {
    throw new Error(error.message); // Throw the original error message
  }
});
export const loginUser = createAsyncThunk('user/loginUser', async (user) => {
  try {
    const response = await axios.post(
      'https://doctors-appointment-0mkx.onrender.com/login',
      user,
    );

    const token = response.headers.authorization.split(' ')[1]; // Extract the token from the "Bearer" header
    console.log(token);
    localStorage.removeItem('jwtToken');

    localStorage.setItem('jwtToken', token); // Save the JWT token in local storage
    console.log(localStorage.getItem('jwtToken'));
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
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
        console.log('created');
        console.log(action.payload.data);
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
