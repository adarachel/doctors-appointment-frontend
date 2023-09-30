import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  reservations: [],
  isLoading: false,
  error: '',
};

export const getReservations = createAsyncThunk('reservations/getReservations', async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/reservations');
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

export const reservationsSlice = createSlice({
  name: 'DateTime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReservations.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(getReservations.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        reservations: action.payload,
      }))
      .addCase(getReservations.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }));
  },
});

export default reservationsSlice.reducer;
