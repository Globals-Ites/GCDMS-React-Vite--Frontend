import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../auth/authSlice';

export const getDistrictDetails2 = createAsyncThunk(
  'district2/getDistrictDetails2',
  async (stateId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SERVER}api/global/get_district_details?state_id=${stateId}`,
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

const initialState = {
  data: null,
  error: null,
  loading: false,
};

const district2Slice = createSlice({
  name: 'district2',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDistrictDetails2.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDistrictDetails2.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDistrictDetails2.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default district2Slice.reducer;
