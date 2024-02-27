import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER } from '../auth/authSlice';
import axios from 'axios';

export const getUnionDetails = createAsyncThunk(
  'unionDetails/getUnionDetails',
  async (board_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SERVER}api/global/get_union_details?board_id=${board_id}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

const unionDetailsSlice = createSlice({
  name: 'unionDetails',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUnionDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUnionDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUnionDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { actions } = unionDetailsSlice;
export default unionDetailsSlice.reducer;
