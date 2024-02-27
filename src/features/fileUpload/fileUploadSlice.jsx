import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SERVER } from '../auth/authSlice';

const getTokenCookie = () => {
  return Cookies.get('jwt');
};

export const getFile = createAsyncThunk(
  'file/getFile',
  async ({ data, filename }, { rejectWithValue }) => {
    try {
      if (data === 'delete') {
        return { data: null };
      }

      const response = await axios.get(`${SERVER}/upload/file/${data}`, {
        headers: {
          'Content-Type': 'image/jpeg',
          Authorization: `Bearer ${getTokenCookie()}`,
        },
        responseType: 'arraybuffer',
      });

      const buffer = Buffer.from(response.data, 'binary').toString('base64');
      const base64data = `data:image/jpeg;base64,${buffer}`;

      return {
        data: {
          data: base64data,
          fileName: filename,
        },
      };
    } catch (error) {
      console.error('error:', JSON.stringify(error));
      console.error('error.response:', JSON.stringify(error.response));

      if (error.response !== undefined && error.response.data !== undefined) {
        return rejectWithValue({ data: error.response.data });
      } else {
        return rejectWithValue({ data: error.message });
      }
    }
  },
);

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    data: null,
    error: null,
    status: 'idle',
  },
  reducers: {
    resetFileState: (state) => {
      state.data = null;
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetFileState } = fileSlice.actions;
export default fileSlice.reducer;
