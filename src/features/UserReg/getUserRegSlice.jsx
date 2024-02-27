import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../auth/authSlice';
// import { getTokenCookie } from './tokenUtils';

export const getUserRegistrationDetails = createAsyncThunk(
    'user/getUserRegistrationDetails',
    async (dataToSubmit) => {
        try {
            if (dataToSubmit === 'delete') {
                return { data: null };
            } else {
                const response = await axios.post(`${SERVER}/user/get-user-registration-details`, dataToSubmit, {
                    // headers: {
                    //     // Authorization: `Bearer ${getTokenCookie()}`,
                    // },
                });
                console.log('response:', JSON.stringify(response.data));
                return response.data;
            }
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw error.message;
            }
        }
    }
);

const initialState = {
    userDetails: null,
    error: null,
    loading: false,
    success: false,
};

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        registerUserSuccess: (state, action) => {
            state.userData = action.payload;
            state.errorData = null;
            state.loading = false;
            state.success = true;
            state.error = false;
            state.message = null;
        },
        errorRegister: (state, action) => {
            state.errorData = action.payload;
            state.userData = null;
            state.loading = false;
            state.success = false;
            state.error = true;
            state.message =
                action.payload.message || 'An error occurred during registration';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserRegistrationDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserRegistrationDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.userDetails = action.payload;
            })
            .addCase(getUserRegistrationDetails.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    },
});

export default userDetailsSlice.reducer;
export const { registerUserSuccess, errorRegister } = userDetailsSlice.actions
