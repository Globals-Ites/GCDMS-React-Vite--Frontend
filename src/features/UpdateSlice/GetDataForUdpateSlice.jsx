import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  number: 0,
};

const getDataForUpdateSlice = createSlice({
  name: '',
  initialState, 
  reducers: {
    SetPageNumberForUdpate(state, action) {
      state.number = action.payload;
    },
    resetPageNumberForUpdate(state) {
      state.number = 0;
    },
  },
});


export const { SetPageNumberForUdpate, resetPageNumberForUpdate } = getDataForUpdateSlice.actions;
export default getDataForUpdateSlice.reducer;