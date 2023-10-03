import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE = "http://127.0.0.1:3000/api";

export const createReserve = createAsyncThunk(
  "reserve/createReserve",
  async (payload) => {
    const ree = {
      appointment_date: payload.date,
      appointment_time: payload.time,
      doctor_id: payload.doctor,
      username: payload.username,
      city: payload.city,
    };
    const response = await fetch("http://127.0.0.1:3000/api/reservations", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(ree),
    });

    const data = await response.json();
    return data;
  }
);

//get reserve and delete reserve

export default ReservationSlice.reducer;
