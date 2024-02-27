import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../auth/authSlice';
import Cookies from 'js-cookie';

export const getIfscDetails =(details)=>{
  return async()=>{
      try {
          const response = await axios.get(`${SERVER}/api/global/get_ifsc_details?ifsc=${details}`);
          return response.data;
        } catch (error) {
          if (error.response) {
            return error.response.data;
          } else {
            return error.message;
          }
        }
  }
}

export const addLabourBankDetails = createAsyncThunk(
  'labour/addLabourBankDetails',
  async (dataToSubmit, thunkAPI) => {
    try {
      const response = await axios.post(
        `${SERVER}api/user/add-labour-bank-details`,
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

export const updateLabourBankDetails = createAsyncThunk(
  'labour/updateLabourBankDetails',
  async (dataToSubmit, thunkAPI) => {
    try {
      console.log(dataToSubmit,"pollll")
      const response = await axios.patch(
        `${SERVER}api/user/update-labour-bank-details`,
        dataToSubmit,
        {
          
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        }
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

const labourSlice = createSlice({
  name: 'labour',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addLabourBankDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLabourBankDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addLabourBankDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default labourSlice.reducer;