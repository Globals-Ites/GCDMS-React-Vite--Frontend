import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../auth/authSlice';
import Cookies from 'js-cookie';


export const getUnionDetails = createAsyncThunk(
  'ninetyDays/getUnion',
  async (id) => {
    try {
      const response = await axios.get(
        `${SERVER}/api/global/get_union_details?board_id=1`,
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error.message;
      }
    }
  },
);


export const getDistrictDetails = createAsyncThunk(
  'ninetyDays/getDistrict',
  async (id) => {
    try {
      const response = await axios.get(
        `${SERVER}/api/global/get_district_details?state_id=${id}`,
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error.message;
      }
    }
  },
);


export const getTalukDetails = createAsyncThunk(
  'ninetyDays/getTaluk',
  async (id) => {
    try {
      const response = await axios.get(
        `${SERVER}/api/global/get_taluk_details?district_id=${id}`,
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error.message;
      }
    }
  },
);

export const getCityNameDetails = createAsyncThunk(
  'ninetyDays/getCityName',
  async (id) => {
    try {
      const response = await axios.get(
        `${SERVER}/api/global/get_city_details?taluk_id=${id}`,
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error.message;
      }
    }
  },
);

export const getVillageNameDetails = createAsyncThunk(
  'ninetyDays/getVillageName',
  async (id) => {
    try {
      const response = await axios.get(
        `${SERVER}/api/global/get_village_details?city_id=${id}`,
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error.message;
      }
    }
  },
);

export const getUserRegistration = createAsyncThunk(
  'ninetyDays/getUserRegistration',
  async (payload) => {
    try {
      console.log(Cookies.get("id"))
      
      const response = await axios.post(
        `${SERVER}api/user/get-user-registration-details`,payload, {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        },
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error.message;
      }
    }
  },
);


export const addNintyDaysDetails= createAsyncThunk(
  'ninetyDays/addNintyDaysDetails',
  async (payload) => {
    try {   
      const response = await axios.post(
        `${SERVER}api/user/add-labour-certificate`,payload, {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        },
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error.message;
      }
    }
  },
);

export const getInspectorDetails = createAsyncThunk(
  'ninetyDays/getInspectorDetails',
  async (id) => {
    try {
      const response = await axios.get(
        `${SERVER}/api/global/get_inspector_details?board_id=1&village_area_id=${id}`,
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error.message;
      }
    }
  },
);


export const getNatureWorkDetails = createAsyncThunk(
  'ninetyDays/getNatureWork',
  async (id) => {
    try {
      const body = {
        board_id: 1,
        catalog_name: 'Nature of Work',
      };
      const response = await axios.post(
        `${SERVER}/api/global/get_catalog_details`,
        body,
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error.message;
      }
    }
  },
);

export const getIssuerDetails = createAsyncThunk(
  'ninetyDays/getIssuer',
  async (id) => {
    try {
      const body = {
        board_id: 1,
        catalog_name: 'Type of Issuer',
      };
      const response = await axios.post(
        `${SERVER}/api/global/get_catalog_details`,
        body,
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error.message;
      }
    }
  },
);

export const ninetyDayDetails = createAsyncThunk(
  'labour/ninetyDayDetails',
  async (dataToSubmit, thunkAPI) => {
    try {
      const response = await axios.post(
        `${SERVER}api/user/update-labour-certificate`,
        dataToSubmit,
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
      .addCase(ninetyDayDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ninetyDayDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(ninetyDayDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default labourSlice.reducer;