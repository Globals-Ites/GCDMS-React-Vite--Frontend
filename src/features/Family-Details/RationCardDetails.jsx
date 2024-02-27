import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


export const RationCardDetails = createAsyncThunk(
  'labour/RationCardDetails',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://gcdmsdbac.hostg.in/api/user/get-user-registration-details`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('jwt')}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);
const initialState = {
  data: null,
  error: null,
  loading: false,
};
const labourSlice = createSlice({
  name: 'labour',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RationCardDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RationCardDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(RationCardDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default labourSlice.reducer;