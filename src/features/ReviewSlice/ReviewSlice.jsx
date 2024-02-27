import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../auth/authSlice';
import Cookies from 'js-cookie';


export const reviewDetails = createAsyncThunk(
  'labour/getRegisterDetails',
  async (dataToSubmit, thunkAPI) => {
    try {
      const response = await axios.post(
        `${SERVER}api/user/get-user-registration-details`,
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        },
      );
      console.log('Labour added successfully. Response:', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);


const initialState = {
  data: null,
  error: null,
  loading: false,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(reviewDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reviewDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(reviewDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;