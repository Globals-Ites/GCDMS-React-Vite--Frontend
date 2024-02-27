import { Cookie } from '@mui/icons-material';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import cookie from 'react-cookies';

// export const SERVER_NAME = "https://www.karmika.in/";
//Dev SERVER (FIREBASE)

// export const SERVER_NAME = "https://gcdmsdev.web.app/";
// export const SERVER = "https://gcdmsdev.hostg.in/api";
// export const SERVER_2 = "https://gcdmsdev.hostg.in/api";

//Production SERVER

// export const SERVER_NAME = "https://kbocwwb.karnataka.gov.in/";
// export const SERVER = "https://apikbocwwb.karnataka.gov.in/api";
// export const SERVER_2 = "https://apikbocwwb.karnataka.gov.in/api";

// QA SERVER

export const SERVER_NAME = 'http://localhost:5173';
export const SERVER = 'http://gcdmsdbac.hostg.in/';
export const SERVER_2 = 'http://gcdmsdbac.hostg.in/';

const getTokenCookie = () => {
  return cookie.get('authToken');
};

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (phoneNumber, { dispatch }) => {
    try {
      const response = await axios.get(`${SERVER}api/user/${phoneNumber}`);
      dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error.message;
      }
    }
  },
);

export const setUser = createAction('auth/setUser', (userData) => {
  Cookies.set('id', userData.data[0].id);
  return {
    payload: userData,
  };
});

export const loginUserHandler = createAsyncThunk(
  'auth/loginUser',
  async (allData) => {
    try {
      const response = await axios.post(
        `${SERVER}api/auth/verify-otp`,
        allData,
      );
      cookie.save('jwt', response.data.jwt, { path: '/' });
      return response.data;
      // if(response.data.success){
      //   useNavigate("/dashboardMigrant")
      // }
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        return error.message;
      }
    }
  },
);

export const getUserRegistrationDetails = createAsyncThunk(
  'user/getUserRegistrationDetails',
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${SERVER}api/user/get-user-registration-details`,
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${getTokenCookie()}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      if (error.response !== undefined) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const generateOtpRegistration = createAsyncThunk(
  'auth/generateOtpRegistration',
  async (dataToSubmit) => {
    try {
      const response = await axios.post(
        `${SERVER}api/user/register-labour-send`,
        dataToSubmit,
      );
      console.log('response:' + JSON.stringify(response.data));
      Cookies.set('hash', response.data.data.hash);
      return response.data;
    } catch (error) {
      if (error.response !== undefined) {
        if (error.response.data !== undefined) return error.response.data;
      } else {
        return error.message;
      }
    }
  },
);

export const generateOtp = createAsyncThunk(
  'auth/generateOtp',
  async (dataToSubmit) => {
    try {
      const response = await axios.post(
        `${SERVER}api/auth/otp-login`,
        dataToSubmit,
      );
      console.log('response:' + JSON.stringify(response.data.data.hash));
      cookie.save('HashData', response.data.data.hash, { path: '/' });
      return response.data;
    } catch (error) {
      if (error.response !== undefined) {
        return error.response.data;
      } else {
        return error.message;
      }
    }
  },
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  success: false,
  isOtpRequested: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      //Cookies.set('jwt', accessToken);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      Cookies.remove('jwt');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserHandler.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUserHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUserHandler.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(generateOtp.pending, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.success = false;
      })
      .addCase(generateOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(generateOtp.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === 'Request failed with status code 401') {
          state.error = 'Access Denied! Invalid OTP';
        } else {
          state.error = action.error.message;
        }
        state.error = action.payload;
      });
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsOtpRequested = (state) => state.auth.isOtpRequested;
//export default getTokenCookie;
