import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const updatePersonalData = createAsyncThunk(
  'personalData/update',
  async (data, thunkAPI) => {
    thunkAPI.dispatch(actions.updatePersonal(data));
    return data;
  },
);

const initialState = {
  personalData: null,
  loading: false,
  error: null,
};

const actionsSlice = createSlice({
  name: 'personalData',
  initialState,
  reducers: {
    updatePersonal(state, action) {
      state.personalData = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { updatePersonal, setLoading, setError } = actionsSlice.actions; // Destructure actions

export default actionsSlice.reducer;
