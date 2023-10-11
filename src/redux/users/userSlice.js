import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signupUser = createAsyncThunk('user/signupUser', async (user) => {
  try {
    const response = await axios.post(
      'https://doctors-appointment-0mkx.onrender.com/signup',
      user,
    );
    const token = response.headers.authorization.split(' ')[1];
    const { username } = response.data.status.data.user;
    localStorage.removeItem('jwtToken');

    localStorage.setItem('jwtToken', token);
    localStorage.setItem('username', username);
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
    const { username } = response.data.status.data.user;
    localStorage.removeItem('jwtToken');
    localStorage.setItem('username', username);
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
    localStorage.removeItem('jwtToken');
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
  },
  reducers: {
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
