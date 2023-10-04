import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './doctors/doctorsSlice';
import userReducer from './users/userSlice';
import reservationReducer from './reservations/reservationsSlice';
import localStorageMiddleware from '../middleware/localStorage';

const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    user: userReducer,
    reservations: reservationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
