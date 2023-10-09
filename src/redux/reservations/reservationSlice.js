import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'https://doctors-appointment-0mkx.onrender.com/api/v1';

// Helper function to get the JWT token from localStorage
const gettoken = () => {
  const jwtToken = localStorage.getItem('jwtToken');
  console.log(`token is ${jwtToken}`);
  return jwtToken;
};

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
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

    console.log('Creating reservation with payload:', ree);

    try {
      const response = await axiosInstance.post('/appointments', ree);
      console.log('Create reservation response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },
);

export const getReserve = createAsyncThunk('reserve/getReserve', async () => {
  try {
    const response = await axiosInstance.get('/appointments');
    console.log('Get reservations response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting reservations:', error);
    throw error;
  }
});

export const deleteReserve = createAsyncThunk(
  'reserve/deleteReserve',
  async (payload) => {
    console.log('Deleting reservation with ID:', payload);

    try {
      const response = await axiosInstance.delete(`/appointments/${payload}`);
      console.log('Delete reservation response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw error;
    }
  },
);

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
      console.log('Reservation created successfully:', action.payload);
      state.regsuccess = action.payload;
      if (action.payload.token) {
        localStorage.setItem('success', JSON.stringify(action.payload));
      }
    });
    builder.addCase(getReserve.fulfilled, (state, action) => {
      console.log('Fetched reservations:', action.payload);
      state.reservations = action.payload;
    });
  },
});

export default ReservationSlice.reducer;
