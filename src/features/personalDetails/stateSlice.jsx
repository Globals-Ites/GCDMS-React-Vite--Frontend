import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../auth/authSlice';

export const getStateDetails = createAsyncThunk(
    'global/getStateDetails',
    async (_, thunkAPI) => {
        try {
            const response = await axios.post(
                `${SERVER}api/global/get_state_details`,
            )
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

const initialState = {
    data: null,
    error: null,
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStateDetails.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getStateDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getStateDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    },
})


export default globalSlice.reducer;