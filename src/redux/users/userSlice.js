import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signupUser = createAsyncThunk('user/signupUser', async (user) => {
  try {
    const response = await axios.post(
      'https://doctors-appointment-0mkx.onrender.com/signup',
      user,
    );

    const token = response.headers.authorization.split(' ')[1];
    const { username, admin, name } = response.data.data.user;
    localStorage.removeItem('jwtToken');
    localStorage.setItem('name', name);
    localStorage.setItem('username', username);
    localStorage.setItem('admin', admin);
    localStorage.setItem('jwtToken', token);

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});
export const loginUser = createAsyncThunk('user/loginUser', async (user) => {
  try {
    const response = await axios.post(
      'https://doctors-appointment-0mkx.onrender.com/login',
      user,
    );

    const token = response.headers.authorization.split(' ')[1];
    const { username, admin, name } = response.data.data.user;
    localStorage.removeItem('jwtToken');
    localStorage.setItem('name', name);
    localStorage.setItem('username', username);
    localStorage.setItem('admin', admin);
    localStorage.setItem('jwtToken', token);

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  try {
    await axios.delete('/logout', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });
    // localStorage.removeItem('jwtToken');
    localStorage.clear();
    return true;
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
    pending: false, // Add a pending state
  },
  reducers: {
    logout: (state) => {
      state.user = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.pending = true; // Set pending to true when signupUser is pending
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.data;
        state.error = action.payload.message;
        state.pending = false; // Set pending to false when signupUser is no longer pending
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        action.error.message = 'This username already exists, kindly choose another one.';
        state.error = action.error.message;
        state.pending = false; // Set pending to false when signupUser is no longer pending
      })
      .addCase(loginUser.pending, (state) => {
        state.pending = true; // Set pending to true when loginUser is pending
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = true;
        state.user = action.payload.data;
        state.pending = false; // Set pending to false when loginUser is no longer pending
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.pending = false; // Set pending to false when loginUser is no longer pending
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
