import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'https://doctors-appointment-0mkx.onrender.com/api/v1/';

const gettoken = () => {
  const jwtToken = localStorage.getItem('jwtToken');

  return jwtToken;
};

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
      throw new Error('Error occurred, try again');
    }
  },
);

export const getReserve = createAsyncThunk('reserve/getReserve', async () => {
  try {
    const response = await axiosInstance.get('/appointments');

    return response.data;
  } catch (error) {
    throw new Error('Error occurred, try again');
  }
});

const initialState = {
  reservations: [],
  pending: false,
  error: null,
  regsuccess: null,
};

const ReservationSlice = createSlice({
  name: 'reserve',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createReserve.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(createReserve.fulfilled, (state, action) => {
      state.pending = false;
      state.regsuccess = action.payload;
    });
    builder.addCase(createReserve.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });

    builder.addCase(getReserve.pending, (state) => {
      state.pending = true;
      state.error = false;
    });
    builder.addCase(getReserve.fulfilled, (state, action) => {
      state.reservations = action.payload;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(getReserve.rejected, (state) => {
      state.error = true;
    });
  },
});

export default ReservationSlice.reducer;
