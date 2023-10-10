import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'https://doctors-appointment-0mkx.onrender.com/api/v1/';

// Helper function to get the JWT token from localStorage
const gettoken = () => {
  const jwtToken = localStorage.getItem('jwtToken');

  return jwtToken;
};

// Axios instance with a default Authorization header
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${gettoken()}`,
  },
});

export const createReserve = createAsyncThunk(
  'reserve/createReserve',
  async (payload) => {
    const ree = {
      appointment_date: payload.date,
      appointment_duration: payload.time,
      doctor_id: payload.doctor,
      city: payload.city,
    };

    try {
      const response = await axiosInstance.post('/appointments', ree);

      return response.data;
    } catch (error) {
      throw new Error('Error occured try again');
    }
  },
);

export const getReserve = createAsyncThunk('reserve/getReserve', async () => {
  try {
    const response = await axiosInstance.get('/appointments');

    return response.data;
  } catch (error) {
    throw new Error('Error occured try again');
  }
});

// export const deleteReserve = createAsyncThunk(
//   'reserve/deleteReserve',
//   async (payload) => {
//     await axiosInstance.delete(`/appointments/${payload}`);
//     return payload;
//   },
// );

const initialState = {
  reservations: [],
  regsuccess: null,
};

const ReservationSlice = createSlice({
  name: 'reserve',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createReserve.fulfilled, (state, action) => {
      state.regsuccess = action.payload;
      if (action.payload.token) {
        localStorage.setItem('success', JSON.stringify(action.payload));
      }
    });
    builder.addCase(getReserve.fulfilled, (state, action) => {
      state.reservations = action.payload;
    });
  },
});

export default ReservationSlice.reducer;
