import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../auth/authSlice';

export const getCityDetails = createAsyncThunk(
  'cityDetails/getCityDetails',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SERVER}api/global/get_city_details?taluk_id=${data}`,
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue('No response received');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

const initialState = {
  cityDetails: null,
  loading: false,
  error: null,
};
const cityDetailsSlice = createSlice({
  name: 'cityDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCityDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCityDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.cityDetails = action.payload;
      })
      .addCase(getCityDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cityDetailsSlice.reducer;
