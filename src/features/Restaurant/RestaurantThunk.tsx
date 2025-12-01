import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginSuccess } from './RestaurantSlice.tsx';
import { BASE_URL } from "../../server.tsx";
import type {ResLogin} from "../../Pages/Registry/Interface.tsx";



export const ResaurantInfo = createAsyncThunk(
    'auth/Restauran',
    async (values: ResLogin, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}restaurants/me`, values);
            dispatch(
                loginSuccess({
                    user: response.data.user,
                    token: response.data.jwt,
                    refreshToken: response.data.refreshToken,
                })
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Restaurant not found');
        }
    }
);
