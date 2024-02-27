import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { SERVER } from '../auth/authSlice';

export const UpdateResidentialAddressDetails = createAsyncThunk(
  'labour/UpdateResidentialAddressDetails',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${SERVER}api/user/update-labour-address`,
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
      .addCase(UpdateResidentialAddressDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateResidentialAddressDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(UpdateResidentialAddressDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default labourSlice.reducer;
