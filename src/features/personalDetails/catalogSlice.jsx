import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../auth/authSlice';

export const getCatalogDetails = createAsyncThunk(
  'catalog/getCatalogDetails',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${SERVER}api/global/get_catalog_details`,
        data,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

const initialState = {
  data: null,
  error: null,
  status: 'idle' | 'pending' | 'succeeded' | 'failed',
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCatalogDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCatalogDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getCatalogDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default catalogSlice.reducer;
