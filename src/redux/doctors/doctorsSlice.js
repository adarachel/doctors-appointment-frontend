import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  doctors: [],
  doctor: [],
  isLoading: false,
  status: 'idle',
  error: '',
};

export const addDoctor = createAsyncThunk('doctor/addDoctor', async (doctorData) => {
  const response = await axios.post('http://localhost:3000/api/doctors', { ...doctorData, price_hour: doctorData.price });
  return response.data;
});

export const getDoctors = createAsyncThunk('doctors/getDoctors', async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/doctors');
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

export const getDoctor = createAsyncThunk('doctors/getDoctor', async (doctorId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/doctors/${doctorId}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

export const deleteDoctor = createAsyncThunk('doctor/deleteDoctor', async (doctorId) => {
  try {
    await axios.delete(`http://localhost:3000/api/doctors/${doctorId}`);
    return doctorId;
  } catch (error) {
    throw error.response.data.error;
  }
});

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
      .addCase(getDoctors.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }))

      .addCase(getDoctor.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(getDoctor.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        doctor: action.payload,
      }))

      .addCase(deleteDoctor.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        const updatedDoctors = state.doctors.filter((doctor) => doctor.id !== action.payload);
        return {
          ...state,
          isLoading: false,
          doctors: updatedDoctors,
        };
      })
      .addCase(deleteDoctor.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }))
      .addCase(addDoctor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors.push(action.payload);
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default doctorsSlice.reducer;