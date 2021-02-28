import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state, action) => state + action.payload,
    decrement: (state, action) => state - action.payload,
  },
});

export default slice.reducer;

const { increment, decrement } = slice.actions;
export const doIncrement = (num) => async (dispatch) => {
  // do some async fetch here
  return dispatch(increment(num));
};
