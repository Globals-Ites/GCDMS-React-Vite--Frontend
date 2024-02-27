import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../auth/authSlice';

export const getTalukDetails = createAsyncThunk(
  'talukDetails/getTalukDetails',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SERVER}api/global/get_taluk_details?district_id=${data}`,
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const talukDetailsSlice = createSlice({
  name: 'talukDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTalukDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTalukDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTalukDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default talukDetailsSlice.reducer;
