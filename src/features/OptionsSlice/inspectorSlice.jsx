import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../auth/authSlice';

export const getInspectorDetails = createAsyncThunk(
  'inspectorDetails/getInspectorDetails',
  async ({ board_id, village_area_id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SERVER}api/global/get_inspector_details`,
        {
          params: { board_id, village_area_id },
        },
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

const inspectorDetailsSlice = createSlice({
  name: 'inspectorDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInspectorDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInspectorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getInspectorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default inspectorDetailsSlice.reducer;
