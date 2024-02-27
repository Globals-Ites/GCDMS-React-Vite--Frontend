import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  number: 0,
};

const numberSlice = createSlice({
  name: 'number',
  initialState, 
  reducers: {
    setNumber(state, action) {
      state.number = action.payload;
    },
    resetNumber(state) {
      state.number = 0;
    },
  },
});


export const { setNumber, resetNumber } = numberSlice.actions;
export default numberSlice.reducer;