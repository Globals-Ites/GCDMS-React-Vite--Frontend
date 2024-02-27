import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../auth/authSlice';

export const getDistrictDetails = createAsyncThunk(
  'districtDetails/getDistrictDetails',
  async (state_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SERVER}api/global/get_district_details?state_id=${state_id}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const districtDetailsSlice = createSlice({
  name: 'districtDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDistrictDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDistrictDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDistrictDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default districtDetailsSlice.reducer;
