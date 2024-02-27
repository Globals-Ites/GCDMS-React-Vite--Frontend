import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../auth/authSlice';

export const uploadFile = createAsyncThunk(
  'upload/uploadFile',
  async (data) => {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('userId', data.userId);
    formData.append('fileType', data.fileType);

    const response = await axios.post(`${SERVER}api/upload/file`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getTokenCookie()}`,
      },
    });

    return response.data;
  },
);

const initialState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
  uploadData: null,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    clearUploadedData(state) {
      state.uploadData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.uploadedData = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export const { clearUploadedData } = uploadSlice.actions;
export default uploadSlice.reducer;
