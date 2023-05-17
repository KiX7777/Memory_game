import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  isLoading: false,
};

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    load(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const UISliceActions = UISlice.actions;

export default UISlice;
