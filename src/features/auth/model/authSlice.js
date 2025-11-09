import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { showError } from "../../error/errorSlice";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue, dispatch }) => {
        try {
            const response = await authApi.login({email, password});
            return response?.user || null; 
        } catch (err) {
            dispatch(showError(err.message || 'Login failed'));
            return rejectWithValue(err.message || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password }, { rejectWithValue, dispatch }) => {
        try {
            const response = await authApi.register({ email, password });
            return response?.user || null;
        } catch (err) {
            dispatch(showError(err.message || 'Register failed'));
            return rejectWithValue(err.message || 'Register failed');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async ({ rejectWithValue, dispatch }) => {
        try {
            await authApi.logout();
            return null;
        } catch (err) {
            dispatch(showError(err.message || 'Logout failed'));
            return rejectWithValue(err.message || 'Logout failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }
        );
    }
});

export default authSlice.reducer;
