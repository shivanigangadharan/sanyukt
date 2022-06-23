import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        user: authReducer
    }
})