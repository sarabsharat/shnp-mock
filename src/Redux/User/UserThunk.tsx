import { createAsyncThunk } from '@reduxjs/toolkit';
import type { LoginType } from "../../Models/LoginInterface.ts";
import type { RestaurantRegistration } from "../../Models/RegistrationFormInterface.ts";
import type {PasswordResetType} from "../../Models/PasswordResetInterface.ts";
import {fetchClient} from "../../utilities/FetchClient.ts";
import type {AuthResponse} from "../../Models/AuthInterface.ts"


export const loginUser = createAsyncThunk<AuthResponse, LoginType>(
    'auth/loginUser',
    async (values, { rejectWithValue }) => {
        try {
            return await fetchClient('restaurantemployees/login', { body: values });
        } catch (error: any) {
            return rejectWithValue(error.message || 'An unknown error prevented login.');
        }
    }
);

export const registerUser = createAsyncThunk<AuthResponse, RestaurantRegistration>(
    'auth/registerUser',
    async (values, { rejectWithValue }) => {
        try {
            return await fetchClient('Restaurants', { body: values });
        } catch (error: any) {
            return rejectWithValue(error.message || 'Registration failed.');
        }
    }
);

export const resetPassword = createAsyncThunk<void, PasswordResetType>(
    'auth/resetPassword',
    async (values, { rejectWithValue }) => {
        try {
            return await fetchClient('restaurantemployees/resetPassword', { body: values });
        } catch (error: any) {
            return rejectWithValue(error.message || 'An unknown error prevented login.');
        }
    }
)