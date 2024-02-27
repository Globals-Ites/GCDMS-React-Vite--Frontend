import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../auth/authSlice';
import Cookies from 'js-cookie';

export const addLabourPersonalDetails = createAsyncThunk(
  'labour/addLabourPersonalDetails',
  async (dataToSubmit, thunkAPI) => {
    const data={...dataToSubmit,user_id:Cookies.get("id")}
    console.log(data)
    try {
      const response = await axios.post(
        `${SERVER}api/user/add-labour-personal-details`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('jwt')}`,
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
      .addCase(addLabourPersonalDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLabourPersonalDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addLabourPersonalDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default labourSlice.reducer;
