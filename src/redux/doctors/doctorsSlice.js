import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  doctors: [],
  doctor: [],
  isLoading: false,
  status: 'idle',
  error: '',
};

// Helper function to get the JWT token from localStorage
const gettoken = () => {
  const jwtToken = localStorage.getItem('jwtToken');

  return jwtToken;
};

// Axios instance with a default Authorization header
const axiosInstance = axios.create({
  baseURL: 'https://doctors-appointment-0mkx.onrender.com/api/v1',
  headers: {
    Authorization: `Bearer ${gettoken()}`,
  },
});

// Create async thunks with the axiosInstance
export const addDoctor = createAsyncThunk(
  'doctor/addDoctor',
  async (doctorData) => {
    try {
      const response = await axiosInstance.post('/doctors', doctorData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
);

export const getDoctors = createAsyncThunk('doctors/getDoctors', async () => {
  try {
    const response = await axiosInstance.get('/doctors');

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const getDoctor = createAsyncThunk(
  'doctors/getDoctor',
  async (doctorId) => {
    try {
      const response = await axiosInstance.get(`/doctors/${doctorId}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
);

export const deleteDoctor = createAsyncThunk(
  'doctor/deleteDoctor',
  async (doctorId) => {
    try {
      await axiosInstance.delete(`/doctors/${doctorId}`);
      return doctorId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
);

export const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDoctors.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(getDoctors.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        doctors: action.payload,
      }))
      .addCase(getDoctors.rejected, (state) => ({
        ...state,
        isLoading: false,
        error: true,
      }))
      .addCase(getDoctor.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(getDoctor.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        doctor: action.payload,
      }))
      .addCase(deleteDoctor.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        const updatedDoctors = state.doctors.filter(
          (doctor) => doctor.id !== action.payload,
        );
        return {
          ...state,
          isLoading: false,
          doctors: updatedDoctors,
        };
      })
      .addCase(deleteDoctor.rejected, (state) => ({
        ...state,
        isLoading: false,
        error: true,
      }))
      .addCase(addDoctor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors.push(action.payload);
      })
      .addCase(addDoctor.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      });
  },
});

export default doctorsSlice.reducer;
