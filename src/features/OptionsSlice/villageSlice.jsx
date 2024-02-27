import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../auth/authSlice';

export const getVillageDetails = createAsyncThunk(
  'villageDetails/getVillageDetails',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SERVER}api/global/get_village_details?city_id=${data}`,
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
  villageDetails: null,
  loading: false,
  error: null,
};

const villageDetails = createSlice({
  name: 'villageDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVillageDetails.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getVillageDetails.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload);
      })
      .addCase(getVillageDetails.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default villageDetails.reducer;