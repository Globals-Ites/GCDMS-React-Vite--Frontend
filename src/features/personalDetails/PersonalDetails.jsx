import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { SERVER } from "../auth/authSlice";

export const PersonalDetails = createAsyncThunk(
  'labour/getPersonalDetails',
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